# Google-Cloud-Demo
A simple demo utilizing Google App Engine and Google Cloud Datastore

## What is it?
This repo contains a simple multiplayer game (maybe more of an animation (:) and a Node.js/Express server. The game saves player names to Google Cloud Datastore so that names cannot be reused, and it can be deployed to Google App Engine (GAE).

## What are all these files?
* /js: Contains clientside, game related code built using Phaser. client.js contains all of the server calls.
* server.js: The Node.js/Express server that the game talks to. The server allows players to communicate and keeps track of player state.
* model-datastore.js: Contains a CRUD api that calls Google Cloud Datastore. Includes functions to read and write to the database to check for duplicate names and add new names. Mostly copied from [here](https://github.com/GoogleCloudPlatform/nodejs-getting-started/blob/master/2-structured-data/books/model-datastore.js).

## How to run locally
1. Download [Node.js and npm](https://www.npmjs.com/get-npm)
2. clone this repo
3. cd into the repo in the terminal and run `npm install` (You may have to use `sudo npm install` if you fail with a permission error).
4. Start the server by running `node server.js`
5. Navigate to [http://localhost:8081](http://localhost:8081)

## How to deploy to Google App Engine
1. Create a project in the [Google Cloud Platform Console](console.cloud.google.com) (You will probably have to [Enable Billing](https://cloud.google.com/billing/docs/how-to/modify-project#enable_billing_for_a_new_project))
2. Download [The cloud sdk](https://cloud.google.com/sdk/downloads)
3. Set your default project by running `gcloud config set <projectid>` <projectid> can be found by clicking on the project name on the top bar of the cloud platform console.
4. Change the projectId value in model-datastore.js
5. Set auth for Datastore by running `gcloud beta auth application-default login`
6. Deploy to appengine by running `gcloud app deploy`. :fire:Boom Bam Pow:fire: Navigate to the (GAE Versions Page)[console.cloud.google.com/appengine/versions], click on the version name, and view your application!!


