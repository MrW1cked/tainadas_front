document.addEventListener('DOMContentLoaded', function() {
    const lista = document.getElementById('lista');
    const form = document.getElementById('addForm');

    // Fetch and display items
    function carregarLista() {
        fetch('http://localhost:9099/todos')
            .then(res => res.json())
            .then(data => {
                lista.innerHTML = '';
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `Nome: ${item.nome} | Produto: ${item.producto}`;
                    lista.appendChild(li);
                });
            })
            .catch(() => {
                lista.innerHTML = '<li>Erro ao carregar lista.</li>';
            });
    }

    carregarLista();

    // Add new item
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const producto = document.getElementById('producto').value;
        fetch('http://localhost:9099/adicionar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, producto })
        })
        .then(res => {
            if (res.ok) {
                window.location.reload();
            } else {
                alert('Erro ao adicionar item.');
            }
        })
        .catch(() => {
            alert('Erro ao adicionar item.');
        });
    });
});

