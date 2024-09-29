# Youtube Clone

Developing a YouTube clone using Next.js, Typescript, FireBase and Google Cloud Run. Developed from the Full Stack Development course on NeetCode.io. 

You can run the app at the cloud run link:
https://yt-web-client-404971007160.us-central1.run.app

Thre are three main parts of this app:  The video processing service, the api service, as well as the web client.  These parts work together as follows:
* Cloud Storage stores the raw and processed videos uploaded by users.
* Pub/Sub sends messages to the video processing service.
* Cloud Run hosts a non-public video processing service. After it transcodes videos, they are uploaded to Cloud Storage.
* Cloud Firestore stores the metadata for the videos.
* Cloud Run hosts the web client as a Next.js app.
* The Next.js app makes API calls to Firebase Functions.
* Firebase Functions fetches videos from Cloud Firestore and returns them to be displayed in the web client.