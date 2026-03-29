const app = require("./app");
const connectDatabase = require("./db/Database");
require("dotenv").config();


// Initialisation de PostHog
const { PostHog } = require('posthog-node');
*
const posthog = new PostHog('phc_KYB9UTF8pm4kCzY0B1TXbMmVecjDeuQ4psoXbEsHuL2', {
  host: 'https://us.i.posthog.com',  *
  personProfiles: 'identified_only', *
});


*
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

*
connectDatabase();

*
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
*
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
