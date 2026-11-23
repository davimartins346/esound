// Verifica se a página carregou
console.log("🛒 Página do carrinho carregada");

// Recupera os dados
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
console.log("📦 Itens no carrinho:", carrinho);

const lista = document.getElementById("listaCarrinho");
const total = document.getElementById("total");

function atualizar() {
    lista.innerHTML = "";
    let soma = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = `
            <div style="text-align:center; padding:40px;">
                <i class="fa-solid fa-cart-shopping" style="font-size:60px; color:#ccc;"></i>
                <h2 style="color:#666;">Seu carrinho está vazio</h2>
                <p style="color:#999;">Adicione produtos ao carrinho para vê-los aqui.</p>
                <a href="catalogo.html">
                    <button style="margin-top:20px; padding:12px 30px; background:#0d47a1; color:white; border:none; border-radius:8px; cursor:pointer;">
                        Ver Catálogo
                    </button>
                </a>
            </div>
        `;
        total.innerHTML = "Total: R$ 0,00";
        return;
    }

    carrinho.forEach((produto, index) => {
        soma += produto.preco;
        lista.innerHTML += `
            <div class="item">
                <img src="${produto.imagem || 'https://via.placeholder.com/130'}" alt="${produto.nome}">
                <div class="info">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao || ''}</p>
                    <div class="preco">
                        R$ ${produto.preco.toFixed(2)}
                    </div>
                </div>
                <div class="acoes">
                    <button onclick="remover(${index})" class="remover">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    total.innerHTML = "Total: R$ " + soma.toFixed(2);
}

function remover(indice) {
    if (confirm("Remover este item do carrinho?")) {
        carrinho.splice(indice, 1);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        atualizar();
    }
}

document.getElementById("limparCarrinho").addEventListener("click", () => {
    if (confirm("Deseja limpar todo o carrinho?")) {
        carrinho = [];
        localStorage.removeItem("carrinho");
        atualizar();
    }
});

// Atualiza a página
atualizar();