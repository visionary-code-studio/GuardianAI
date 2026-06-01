How to run the website
1. Install frontend dependencies
From the project root:

cd c:\Users\user\OneDrive\Desktop\Guardian_AI\guardian-ai-web
npm install

2. Start the frontend
From the project root:

npm run dev

That runs the Vite-powered React app.

Backend / API server
The backend is in backend and is separate from the frontend.

1. Install backend dependencies
cd c:\Users\user\OneDrive\Desktop\Guardian_AI\guardian-ai-web\backend
npm install

2. Start the backend
node server.js

The backend listens on PORT or defaults to 5000. It also tries to connect to MongoDB via MONGO_URI and will fall back to an in-memory database if needed.

Summary
Frontend: npm run dev in the root folder
Backend: node server.js in backend