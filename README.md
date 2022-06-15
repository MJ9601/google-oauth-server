## Project overview
This project handles google oauth2 signin process through the frontend framework (`Next`) and backend server (`express`). The returning data from [google.oauth2.googleapis](https://google.oauth.googleapis.com) will be stored in `mongodb` database, then backend server creates a session for user and send back an `accessToken` and a `refreshToken` within `response` headers as `cookies`. The above process allows SSR to render userInfo and perform his/her loggin process on the client's next visits.

## Getting started

<b>Server:</b>
To run the server in development mode at the server directory use following commad

```bash
yarn dev
or
npm dev
```
The server will be running on PORT `8080` and it is accessable in [http://localhost:8080](http://localhost:8080).

<b>UI</b>

To run the UI in development mode at the ui directory use following commad

```bash 
yarn dev
or
npm dev
```

The ui will be running on PORT `3000` and it is accessable through [http://localhost:3000](http://localhost:3000) url.

## Tech in Use

The both ui and server are writtin in <code>Typescript</code>. In the following lines the Tech which have been used to create ui and server are listed:

<b>Server</b>

The Tech the use in the server are:

```bash
Typescript,
express,
mongoose,
cookie-parser,
cors,

```

<b>Ui</b>

A simple login Ui is choose for this project since the main focus of it is on the backend, so only Tech required is <i>Next</i> with <code>SSR</code>.

## Project Status

Started, under development.



