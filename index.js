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
    // Ensure all items have an id
    items = items.map((item, idx) => {
        if (typeof item.id !== 'number') {
            return { ...item, id: idx + 1 };
        }
        return item;
    });
    // Assign sequential id
    let nextId = 1;
    if (items.length > 0) {
        nextId = Math.max(...items.map(i => i.id)) + 1;
    }
    items.push({ id: nextId, nome, producto });
    fs.writeFileSync(JSON_FILE, JSON.stringify(items, null, 2));
    res.json({ success: true });
});

// Delete item by id
app.delete('/eliminar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
    let items = [];
    if (fs.existsSync(JSON_FILE)) {
        try {
            items = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
        } catch (e) {
            items = [];
        }
    }
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) {
        return res.status(404).json({ error: 'Item não encontrado' });
    }
    items.splice(idx, 1);
    fs.writeFileSync(JSON_FILE, JSON.stringify(items, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Tainada server running on http://localhost:${PORT}`);
});
