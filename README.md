# Dear Mom, please stop giving out my phone number 

This is a Vonage based system that handles responding to calls and texts for when my mother gives out my Vonage number without my permission. 


## Set up
### External Dependencies

Make sure you sign up for a [Vonage account](https://www.vonage.com/developer-center/) - you will need to create a new project, and assign a number to the project. 

For local development, make sure you set up [NGROK](https://ngrok.com/) on your system, and run it:
```bash
ngrok http 3000
```

This will enable you to test the endpoints with the Vonage API by exposing the local webserver. 

### ENV Vars 

Create a file `.env` in `/`, and fill in with the relevant information:

```bash
NEXMO_API_KEY='{API key created for your Vonage Project}'
NEXMO_API_SECRET='{API secret created for your Vonage project}'
NEXMO_NUMBER = '{phone number you assign to your Vonage project}'
```

## Getting Started

Clone the repository, install the packages, and run the development server:
```bash
$ npm i
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Caveat

If you receive the following error:

```
Error [ERR_REQUIRE_ESM]: Must use import to load ES Module
```

Make sure you're using Node 13.0.0 or higher.


## Connecting to Vonage

Once you've deployed the server - either on a service like Heroku or exposed the local endpoints using NGROK - you can then fill out the webhooks on the Vonage website. Each endpoint maps to a specific webhook required by the Vonage API.

For the Voice API - 
- Answer URL: /webhooks/voice-inbound
- Event URL: /webhooks/voice-status

For the Messaging API - 
- Inbound URL: /webhooks/message-inbound
- Status URL: /webhooks/message-status


Specifically, for the Messaging API, you need to also go in and set your "Default SMS Settings" to the same URLs as the ones set for the Messaging API. These settings can be found under `Account>Settings`. 