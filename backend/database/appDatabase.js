const { MongoClient } = require('mongodb');
require('dotenv').config();

let _db;
db = {
    "professionalName": "Your Name",
    "base64Image": "your-base64-image-string",
    "nameLink": {
        "firstName": "Your First Name",
        "url": "https://yourwebsite.com"
    },
    "primaryDescription": " is a software developer",
    "workDescription1": "Description of your work experience part 1",
    "workDescription2": "Description of your work experience part 2",
    "linkTitleText": "Connect With Me",
    "linkedInLink": {
        "text": "LinkedIn Profile",
        "link": "https://www.linkedin.com/in/yourprofile"
    },
    "githubLink": {
        "text": "GitHub Profile",
        "link": "https://github.com/yourusername"
    }
}
const initDb = async () => {
    if (_db) {
        console.log('Database is already initialized!');
        return;
    }

    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        _db = client.db();
        console.log('Database initialized');
    } catch (err) {
        throw err;
    }
};

const getDb = () => {
    if (!_db) {
        throw Error('Database not initialized');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb
};