document.addEventListener('DOMContentLoaded', function() {
    const lista = document.getElementById('lista');
    const form = document.getElementById('addForm');

    // Helper: Parse CSV string to array of objects
    function parseCSV(csv) {
        if (!csv) return [];
        return csv.trim().split('\n').map(line => {
            const [nome, producto] = line.split(',');
            return { nome, producto };
        });
    }

    // Helper: Convert array of objects to CSV string
    function toCSV(data) {
        return data.map(item => `${item.nome},${item.producto}`).join('\n');
    }

    // Load items from localStorage CSV
    function carregarLista() {
        const csv = localStorage.getItem('tainada_csv') || '';
        const data = parseCSV(csv);
        lista.innerHTML = '';
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `Nome: ${item.nome} | Produto: ${item.producto}`;
            lista.appendChild(li);
        });
    }

    // Export CSV to a real file for download
    function exportCSV() {
        const csv = localStorage.getItem('tainada_csv') || '';
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tainada.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Add export button to the page
    function addExportButton() {
        const btn = document.createElement('button');
        btn.textContent = 'Exportar CSV';
        btn.style.marginBottom = '16px';
        btn.onclick = exportCSV;
        lista.parentNode.insertBefore(btn, lista);
    }

    carregarLista();
    addExportButton();

    // Add new item to localStorage CSV
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const producto = document.getElementById('producto').value;
        const csv = localStorage.getItem('tainada_csv') || '';
        const data = parseCSV(csv);
        data.push({ nome, producto });
        localStorage.setItem('tainada_csv', toCSV(data));
        window.location.reload();
    });
});
