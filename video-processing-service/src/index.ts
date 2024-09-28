import express from "express";
import { 
    uploadProcessedVideo,
    downloadRawVideo,
    deleteRawVideo,
    deleteProcessedVideo,
    convertVideo,
    setUpDirectories
} from './storage';
import { isVideoNew, setVideo } from "./firestore";
  
//Create local directories for videos
setUpDirectories();

const app = express();
app.use(express.json());

app.post("/process-video",  async (req, res) => {
    // Get bucket and filename from Cloud pub/sub message
    let data;
    try {
        const message = Buffer.from(req.body.message.data,
            'base64').toString('utf8');
        data = JSON.parse(message);
        if (!data.name) {
            throw new Error('Invalid message payload received.');
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send('Bad Request: missing filename.');
    }

    const inputFileName = data.name;
    const outputFileName = `processed-${inputFileName}`;
    const videoId = inputFileName.split('.')[0];

    if (!isVideoNew(videoId)) {
        return res.status(400).send('Bad Request: video already processing or processed.');
      } else {
        await setVideo(videoId, {
          id: videoId,
          uid: videoId.split('-')[0],
          status: 'processing'
        });
    }

    //Download raw vid from cloud strorage
    await downloadRawVideo(inputFileName);

    // Process the video into 360p
    try {
        await convertVideo(inputFileName, outputFileName)
    } catch (err) {
        await Promise.all([
            deleteRawVideo(inputFileName),
            deleteProcessedVideo(outputFileName)
        ]);
        return res.status(500).send('Processing failed');
    }

    // upload the processed video to cloud storage
    await uploadProcessedVideo(outputFileName);

    await setVideo(videoId, {
        status: 'processed',
        filename: outputFileName
    });

    await Promise.all([
        deleteRawVideo(inputFileName),
        deleteProcessedVideo(outputFileName)
    ]);

    return res.status(200).send('Processing finished successfully');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});