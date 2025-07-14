const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 9079;
const CSV_FILE = path.join(__dirname, 'data.csv');

// Ensure CSV file exists with header
if (!fs.existsSync(CSV_FILE)) {
    fs.writeFileSync(CSV_FILE, 'nome,producto\n');
}

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Get all items from CSV
app.get('/todos', (req, res) => {
    // Create CSV file if it doesn't exist
    if (!fs.existsSync(CSV_FILE)) {
        fs.writeFileSync(CSV_FILE, 'nome,producto\n');
    }
    const csv = fs.readFileSync(CSV_FILE, 'utf8');
    const lines = csv.trim() ? csv.trim().split('\n') : [];
    // Remove header line
    const items = lines.slice(1).map(line => {
        const [nome, producto] = line.split(',');
        return { nome, producto };
    });
    res.json(items);
});

// Add new item to CSV
app.post('/adicionar', (req, res) => {
    const { nome, producto } = req.body;
    if (!nome || !producto) return res.status(400).json({ error: 'Missing fields' });
    const line = `${nome},${producto}\n`;
    fs.appendFileSync(CSV_FILE, line);
    res.json({ success: true });
});

// Serve CSV file directly
app.get('/data.csv', (req, res) => {
    res.sendFile(CSV_FILE);
});

app.listen(PORT, () => {
    console.log(`Tainada server running on http://localhost:${PORT}`);
});
