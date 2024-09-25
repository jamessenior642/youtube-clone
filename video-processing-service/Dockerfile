# official Node runtime as parent image
FROM node:18

#set the working directory in the container to /app
WORKDIR /app

#installffmpeg in the container
RUN apt-get update && apt-get install -y ffmpeg

# copy package.json and package-lock.json into working directory
COPY package*.json ./

#Install any needed packages specified in package.json
RUN npm install

#copy app source inside docker image
COPY . .

#Make port 3000 available outside this container
EXPOSE 3000

#Define the command to run your app using CMD (only one CMD Allowed)
CMD [ "npm", "start"]
