const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/analyze', upload.single('image'), async (req, res) => {
    try {
        const { symptoms, history } = req.body;
        const imageFile = req.file;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                error: 'Server Configuration Error',
                details: 'GEMINI_API_KEY is not set.'
            });
        }

        // Use Gemini 1.5 Flash for multimodal capabilities
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        let promptParts = [
            `Act as an advanced medical AI assistant. Analyze the following patient symptoms and history.`,
            `Symptoms: ${symptoms}`,
            `Patient History: ${history || 'Not provided'}`
        ];

        // Add image part if file is uploaded
        if (imageFile) {
            promptParts.push({
                inlineData: {
                    data: imageFile.buffer.toString('base64'),
                    mimeType: imageFile.mimetype
                }
            });
            promptParts.push(`Analyze the attached image in the context of the symptoms described.`);
        }

        promptParts.push(`
        Provide a structured analysis in valid JSON format ONLY, with no additional text or markdown formatting. The structure must be:
        {
            "condition": "Most likely condition name",
            "confidence": 0-100 (integer representing confidence level),
            "indicators": ["List of 3-5 key symptoms that match this condition"],
            "recommendations": ["List of 3-5 immediate actions or advice"]
        }
        
        Ensure the tone is professional, empathetic, and clear.
        IMPORTANT: Your response must be ONLY the raw JSON string. Do not wrap it in markdown code blocks.
        `);

        const result = await model.generateContent(promptParts);
        const response = await result.response;
        const text = response.text();

        // Clean up response if it contains markdown code blocks despite instructions
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const data = JSON.parse(jsonStr);
            res.json(data);
        } catch (parseError) {
            console.error('AI Response Parsing Error:', parseError);
            console.error('Raw AI Response:', text);
            res.status(500).json({ error: 'Failed to process AI response', raw: text });
        }

    } catch (error) {
        console.error('AI Analysis Error:', error);
        res.status(500).json({ error: 'AI Analysis Failed', details: error.message });
    }
});

module.exports = router;
