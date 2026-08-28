// ==========================================
// DADOS DOS PRODUTOS (com caminhos corretos)
// ==========================================
const produtos = {
    1: {
        nome: "Violão Yamaha F310",
        preco: "R$ 1.299,90",
        descricao: "Violão acústico com excelente sonoridade. Ideal para iniciantes e músicos intermediários.",
        imagem: "img/violaoyamahaf310.png",
        categoria: "Violões",
        avaliacao: 4.5,
        especificacoes: {
            modelo: "F310",
            marca: "Yamaha",
            tipo: "Acústico",
            cordas: "Aço"
        }
    },
    2: {
        nome: "Guitarra Fender Stratocaster",
        preco: "R$ 5.499,90",
        descricao: "Clássica guitarra Fender Stratocaster. Som versátil e design icônico.",
        imagem: "img/guitarra.jpg",
        categoria: "Guitarras",
        avaliacao: 4.8,
        especificacoes: {
            modelo: "Stratocaster",
            marca: "Fender",
            tipo: "Elétrica",
            captadores: "SSS"
        }
    },
    3: {
        nome: "Baixo Yamaha TRBX304",
        preco: "R$ 2.699,90",
        descricao: "Baixo ativo de 4 cordas com excelente versatilidade tonal.",
        imagem: "img/baixo.jpg",
        categoria: "Baixos",
        avaliacao: 4.3,
        especificacoes: {
            modelo: "TRBX304",
            marca: "Yamaha",
            tipo: "Ativo",
            cordas: 4
        }
    }
};

// ==========================================
// PEGA O ID DA URL
// ==========================================
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

// Verifica se o ID é válido
let produto;
if (id && produtos[id]) {
    produto = produtos[id];
} else {
    // Se não tiver ID ou ID inválido, usa o primeiro produto como fallback
    produto = produtos[1];
}

// ==========================================
// VERIFICA SE O PRODUTO EXISTE
// ==========================================
if (produto) {
    // Preenche os dados do produto
    document.getElementById("nome").textContent = produto.nome;
    document.getElementById("preco").textContent = produto.preco;
    document.getElementById("descricao").textContent = produto.descricao;
    
    // Define a imagem
    const imgElement = document.getElementById("imagem");
    imgElement.src = produto.imagem;
    imgElement.alt = produto.nome;
    
    // Se a imagem não carregar, mostra fallback
    imgElement.onerror = function() {
        this.src = "https://via.placeholder.com/600x400/cccccc/666666?text=Imagem+Indisponível";
        this.alt = "Imagem indisponível";
    };
    
    // Atualiza as estrelas (avaliação)
    const estrelasContainer = document.querySelector(".estrelas");
    const avaliacao = produto.avaliacao || 0;
    const estrelasCheias = Math.floor(avaliacao);
    const estrelasMeia = avaliacao % 1 >= 0.5 ? 1 : 0;
    const estrelasVazias = 5 - estrelasCheias - estrelasMeia;
    
    let estrelasHTML = '';
    for (let i = 0; i < estrelasCheias; i++) {
        estrelasHTML += '★';
    }
    for (let i = 0; i < estrelasMeia; i++) {
        estrelasHTML += '☆'; // Meia estrela (opcional)
    }
    for (let i = 0; i < estrelasVazias; i++) {
        estrelasHTML += '★';
    }
    estrelasContainer.textContent = estrelasHTML;
    
    // Atualiza o título da página
    document.title = `${produto.nome} | E-Sound`;
    
    console.log(`📦 Produto carregado: ${produto.nome}`);
    console.log(`🖼️ Imagem: ${produto.imagem}`);
    console.log(`🔗 ID da URL: ${id || 'nenhum'}`);
    
} else {
    // Produto não encontrado
    document.getElementById("nome").textContent = "Produto não encontrado";
    document.getElementById("preco").textContent = "";
    document.getElementById("descricao").textContent = "Desculpe, este produto não existe ou foi removido.";
    document.getElementById("imagem").style.display = "none";
    document.querySelector(".estrelas").textContent = "";
    document.title = "Produto não encontrado | E-Sound";
    
    console.error(`❌ Produto com ID ${id} não encontrado!`);
}

// ==========================================
// BOTÃO COMPRAR
// ==========================================
document.querySelector(".comprar")?.addEventListener("click", function() {
    if (produto) {
        // Verifica se o carrinho existe no localStorage
        let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        
        // Verifica se o produto já está no carrinho
        const itemExistente = carrinho.find(item => item.id === parseInt(id));
        
        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            carrinho.push({
                id: parseInt(id),
                nome: produto.nome,
                preco: produto.preco,
                imagem: produto.imagem,
                quantidade: 1
            });
        }
        
        // Salva no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        
        // Feedback visual
        const btnComprar = document.querySelector(".comprar");
        const textoOriginal = btnComprar.textContent;
        btnComprar.textContent = "✅ Adicionado!";
        btnComprar.style.background = "#28a745";
        
        setTimeout(() => {
            btnComprar.textContent = textoOriginal;
            btnComprar.style.background = "#17489f";
        }, 2000);
        
        console.log(`🛒 Produto adicionado ao carrinho: ${produto.nome}`);
        console.log(`📦 Carrinho atual:`, carrinho);
    }
});

// ==========================================
// BOTÃO VOLTAR (melhorado)
// ==========================================
document.querySelector(".voltar")?.addEventListener("click", function(e) {
    e.preventDefault();
    // Volta para a página anterior ou para o catálogo
    if (document.referrer) {
        window.history.back();
    } else {
        window.location.href = "catalogo.html";
    }
});

// ==========================================
// VERIFICA SE O PRODUTO FOI CARREGADO DA LISTA CORRETA
// ==========================================
console.log(`🔍 Debug - Produtos disponíveis:`, Object.keys(produtos));