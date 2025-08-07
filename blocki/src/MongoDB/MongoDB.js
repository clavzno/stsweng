const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://lorenzodonaire:Dldxif2H2D2OwlL4@blocki.w0d1igm.mongodb.net/?retryWrites=true&w=majority&appName=Blocki";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Helper to get the database instance
async function getDatabase() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db("Blocki"); // Use your actual DB name here
}

module.exports = { getDatabase };
