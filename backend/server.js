require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
let MongoMemoryServer;

try {
    MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
} catch (e) {
    console.log('mongodb-memory-server not found, standard connection only.');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection Logic
const connectDB = async () => {
    let mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/guardian-ai';

    // Check if we should use in-memory DB or if connection fails
    console.log('------------------------------------------------');
    console.log('Attempting to connect to MongoDB...');

    try {
        // Try connecting to local/remote instance first
        // Set strictQuery to true to avoid warnings
        mongoose.set('strictQuery', false);

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 2000 // Low timeout to fail fast if not local
        });
        console.log(`✅ Connected to Local MongoDB at: ${mongoUri}`);
    } catch (err) {
        console.error('❌ Failed to connect to local MongoDB:', err.message);

        if (MongoMemoryServer) {
            console.log('⚠️  Falling back to In-Memory Database (No installation required)...');
            try {
                const mongod = await MongoMemoryServer.create();
                const uri = mongod.getUri();
                await mongoose.connect(uri);
                console.log(`✅ Connected to In-Memory MongoDB at: ${uri}`);
            } catch (memErr) {
                console.error('❌ Failed to start In-Memory Database:', memErr.message);
                process.exit(1);
            }
        } else {
            console.error('❌ In-Memory DB module not found. Please run "npm install mongodb-memory-server"');
        }
    }
    console.log('------------------------------------------------');
};

// Connect to DB
connectDB();

// Routes
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
    res.send('Guardian AI API is running...');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
