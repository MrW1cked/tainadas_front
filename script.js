document.addEventListener('DOMContentLoaded', function() {
    const lista = document.getElementById('lista');
    const form = document.getElementById('addForm');

    // Load items from server JSON
    function carregarLista() {
        fetch('/todos')
            // Fetch items from the server
            .then(res => res.json())
            .then(data => {
                lista.innerHTML = '';
                data.forEach((item) => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${item.id} | Nome: ${item.nome} | Produto: ${item.producto} `;
                    // Add delete button
                    const btn = document.createElement('button');
                    btn.textContent = 'Eliminar';
                    btn.className = 'delete-btn';
                    btn.onclick = function() {
                        const pwd = prompt('Insira a password para eliminar:');
                        if (pwd === 'Sousa123') {
                            fetch(`/eliminar/${item.id}`, { method: 'DELETE' })
                                .then(res => {
                                    if (!res.ok) {
                                        return res.text().then(text => { throw new Error(text); });
                                    }
                                    return res.json();
                                })
                                .then(() => window.location.reload())
                                .catch((err) => alert('Erro ao eliminar item: ' + err.message));
                        } else {
                            alert('Password incorreta!');
                        }
                    };
                    li.appendChild(btn);
                    lista.appendChild(li);
                });
            })
            .catch(() => {
                lista.innerHTML = '<li>Erro ao carregar lista.</li>';
            });
    }

    carregarLista();

    // Add new item to server JSON
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const producto = document.getElementById('producto').value;
        fetch('/adicionar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, producto })
        })
        .then(res => res.json())
        .then(() => {
            window.location.reload();
        })
        .catch(() => {
            alert('Erro ao adicionar item.');
        });
    });
});
