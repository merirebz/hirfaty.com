const app = require("./app");
const connectDatabase = require("./db/Database");
require("dotenv").config();


// Initialisation de PostHog
const { PostHog } = require('posthog-node');
// Initialisation de PostHog avec les vraies valeurs
const posthog = new PostHog('phc_KYB9UTF8pm4kCzY0B1TXbMmVecjDeuQ4psoXbEsHuL2', {
  host: 'https://us.i.posthog.com',  // URL de l'instance de PostHog
  personProfiles: 'identified_only', // Créer des profils uniquement pour les utilisateurs identifiés
});


// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// connect db
connectDatabase();

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
