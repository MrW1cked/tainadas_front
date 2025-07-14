const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 9079;
const JSON_FILE = path.join(__dirname, 'data.json');

// Ensure JSON file exists
if (!fs.existsSync(JSON_FILE)) {
    fs.writeFileSync(JSON_FILE, '[]');
}

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Get all items from JSON
app.get('/todos', (req, res) => {
    if (!fs.existsSync(JSON_FILE)) {
        fs.writeFileSync(JSON_FILE, '[]');
    }
    const raw = fs.readFileSync(JSON_FILE, 'utf8');
    let items = [];
    try {
        items = JSON.parse(raw);
    } catch (e) {
        items = [];
    }
    res.json(items);
});

// Add new item to JSON
app.post('/adicionar', (req, res) => {
    const { nome, producto } = req.body;
    if (!nome || !producto) return res.status(400).json({ error: 'Missing fields' });
    let items = [];
    if (fs.existsSync(JSON_FILE)) {
        try {
            items = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
        } catch (e) {
            items = [];
        }
    }
    items.push({ nome, producto });
    fs.writeFileSync(JSON_FILE, JSON.stringify(items, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Tainada server running on http://localhost:${PORT}`);
});
