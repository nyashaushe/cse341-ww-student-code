const express = require('express');
const { initDb, getDb } = require('./database/appDatabase');
const app = express();
const port = 8080;

// Enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Routes
app.get('/professional', async (req, res) => {
    try {
        const db = getDb();
        const result = await db.collection('professional').findOne({});

        if (!result) {
            // Fallback data if no document exists
            const data = {
                professionalName: "Your Name",
                base64Image: "",
                nameLink: {
                    firstName: "Your First Name",
                    url: "https://yourwebsite.com"
                },
                primaryDescription: " is a software developer",
                workDescription1: "Description of your work experience part 1",
                workDescription2: "Description of your work experience part 2",
                linkTitleText: "Connect With Me",
                linkedInLink: {
                    text: "LinkedIn Profile",
                    link: "https://www.linkedin.com/in/yourprofile"
                },
                githubLink: {
                    text: "GitHub Profile",
                    link: "https://github.com/yourusername"
                }
            };
            res.json(data);
        } else {
            res.json(result);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Initialize database then start server
initDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
    });