const solr = require('solr-client');
const mongoose = require('mongoose');
const User = require('./path-to-your-user-model'); // Update the path accordingly

// MongoDB Connection String
const mongoConnectionString = 'mongodb://localhost:27017/your_database';

// Solr Connection Configuration
const solrClient = solr.createClient({
  host: 'localhost',
  port: '8983',
  core: 'your_solr_core',
  protocol: 'http',
});

// Create Solr Schema
const solrSchema = [
  { name: 'userName', type: 'string', indexed: true, stored: true },
  { name: 'email', type: 'string', indexed: true, stored: true },
  { name: 'phoneNumber', type: 'string', indexed: true, stored: true },
  { name: 'id', type: 'string', indexed: true, stored: true },
  { name: 'address', type: 'string', indexed: true, stored: true },
  // Add more fields as needed
];

// Create Solr Schema Request
solrClient.autoCommit = true;
solrClient.autoCommitMaxDocs = 10;
solrClient.addSchemaFields(solrSchema, function(err, response) {
  if (err) {
    console.log('Error creating Solr schema:', err);
  } else {
    console.log('Solr schema created successfully:', response);
  }
});

// MongoDB to Solr Data Sync
const syncDataToSolr = function() {
  mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // Example: Query MongoDB using the Mongoose model and index data in Solr
  User.find({}, function(err, users) {
    if (err) {
      console.error('Error querying MongoDB:', err);
      mongoose.connection.close();
      return;
    }

    users.forEach(function(user) {
      const solrDoc = {
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        id: user.id,
        address: user.address,
        // Add more fields as needed
      };

      solrClient.add(solrDoc, function(err, response) {
        if (err) {
          console.error('Error indexing document in Solr:', err);
        } else {
          console.log('Document indexed in Solr:', response);
        }
      });
    });

    // Close MongoDB connection
    mongoose.connection.close();
  });
};

// Run the data synchronization function
syncDataToSolr();
