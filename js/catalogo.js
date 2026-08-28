// ==========================================
// CATÁLOGO - E-Sound
// ==========================================

// ==========================================
// BANCO DE DADOS DE PRODUTOS
// ==========================================
const PRODUTOS = [
    {
        id: 1,
        nome: "Violão Yamaha F310",
        preco: "R$ 1.299,90",
        descricao: "Violão acústico com excelente sonoridade. Ideal para iniciantes e músicos intermediários.",
        imagem: "img/violaoyamahaf310.png",
        categoria: "Violões",
        avaliacao: 4.5
    },
    {
        id: 2,
        nome: "Guitarra Fender Stratocaster",
        preco: "R$ 5.499,90",
        descricao: "Clássica guitarra Fender Stratocaster. Som versátil e design icônico.",
        imagem: "img/guitarrafenderstratocaster.png",
        categoria: "Guitarras",
        avaliacao: 4.8
    },
    {
        id: 3,
        nome: "Baixo Yamaha TRBX304",
        preco: "R$ 2.699,90",
        descricao: "Baixo ativo de 4 cordas com excelente versatilidade tonal.",
        imagem: "img/baixoyamahatrbx304.jpg",
        categoria: "Baixos",
        avaliacao: 4.3
    },
    {
        id: 4,
        nome: "Teclado Casio CT-X700",
        preco: "R$ 1.899,90",
        descricao: "Teclado digital com 61 teclas e diversos sons e ritmos.",
        imagem: "img/teclado.jpg",
        categoria: "Teclados",
        avaliacao: 4.2
    },
    {
        id: 5,
        nome: "Bateria Eletrônica Roland TD-1DMK",
        preco: "R$ 4.299,90",
        descricao: "Bateria eletrônica com mesh heads e som realista.",
        imagem: "img/bateria.jpg",
        categoria: "Baterias",
        avaliacao: 4.6
    },
    {
        id: 6,
        nome: "Ukulele Mahalo Rainbow",
        preco: "R$ 399,90",
        descricao: "Ukulele colorido, perfeito para iniciantes e crianças.",
        imagem: "img/ukulele.jpg",
        categoria: "Cordas",
        avaliacao: 4.0
    }
];

// ==========================================
// FUNÇÃO PARA GERAR ESTRELAS
// ==========================================
function gerarEstrelas(avaliacao) {
    const estrelasCheias = Math.floor(avaliacao);
    const temMeia = avaliacao % 1 >= 0.5;
    const estrelasVazias = 5 - estrelasCheias - (temMeia ? 1 : 0);
    
    let estrelas = '';
    
    // Estrelas cheias
    for (let i = 0; i < estrelasCheias; i++) {
        estrelas += '⭐';
    }
    
    // Meia estrela (opcional)
    if (temMeia) {
        estrelas += '⭐';
    }
    
    // Estrelas vazias
    for (let i = 0; i < estrelasVazias; i++) {
        estrelas += '☆';
    }
    
    return estrelas;
}

// ==========================================
// RENDERIZAR PRODUTOS
// ==========================================
function renderizarProdutos(categoria = 'todos') {
    const container = document.getElementById('listaProdutos');
    
    // Filtrar produtos
    let produtosFiltrados = PRODUTOS;
    if (categoria !== 'todos') {
        produtosFiltrados = PRODUTOS.filter(p => p.categoria === categoria);
    }
    
    // Verificar se tem produtos
    if (produtosFiltrados.length === 0) {
        container.innerHTML = `
            <div class="sem-produtos">
                <h2>😕 Nenhum produto encontrado</h2>
                <p>Não encontramos produtos na categoria selecionada.</p>
            </div>
        `;
        return;
    }
    
    // Gerar HTML dos produtos
    container.innerHTML = produtosFiltrados.map(produto => `
        <div class="produto-card" data-id="${produto.id}">
            <img src="${produto.imagem}" alt="${produto.nome}" 
                 onerror="this.src='https://via.placeholder.com/300x300/cccccc/666666?text=Imagem+Indisponível'">
            <span class="categoria-badge">${produto.categoria}</span>
            <h3>${produto.nome}</h3>
            <p class="descricao">${produto.descricao}</p>
            <div class="estrelas">${gerarEstrelas(produto.avaliacao)}</div>
            <p class="preco">${produto.preco}</p>
            <div class="botoes">
                <a href="produto.html?id=${produto.id}" class="btn-detalhes">
                    <i class="fa-solid fa-eye"></i> Detalhes
                </a>
                <button onclick="adicionarAoCarrinho(${produto.id})" class="btn-comprar">
                    <i class="fa-solid fa-cart-plus"></i> Comprar
                </button>
            </div>
        </div>
    `).join('');
}

// ==========================================
// ADICIONAR AO CARRINHO
// ==========================================
function adicionarAoCarrinho(id) {
    const produto = PRODUTOS.find(p => p.id === id);
    if (!produto) {
        console.error('❌ Produto não encontrado!');
        return;
    }
    
    // Buscar carrinho do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    
    // Verificar se produto já está no carrinho
    const itemExistente = carrinho.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1
        });
    }
    
    // Salvar no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    // Feedback visual no botão
    const botoes = document.querySelectorAll(`.produto-card[data-id="${id}"] .btn-comprar`);
    botoes.forEach(btn => {
        const textoOriginal = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado!';
        btn.classList.add('adicionado');
        
        setTimeout(() => {
            btn.innerHTML = textoOriginal;
            btn.classList.remove('adicionado');
        }, 2000);
    });
    
    // Atualizar contador do carrinho (se existir)
    atualizarContadorCarrinho();
    
    console.log(`🛒 Adicionado ao carrinho: ${produto.nome}`);
    console.log(`📦 Carrinho (${carrinho.length} itens):`, carrinho);
}

// ==========================================
// ATUALIZAR CONTADOR DO CARRINHO
// ==========================================
function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    const total = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    
    // Atualizar se existir um elemento com id 'carrinhoCount'
    const contador = document.getElementById('carrinhoCount');
    if (contador) {
        contador.textContent = total;
        contador.style.display = total > 0 ? 'inline' : 'none';
    }
}

// ==========================================
// CONFIGURAR FILTROS
// ==========================================
function configurarFiltros() {
    const filtros = document.querySelectorAll('.filtro-btn');
    
    filtros.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover classe ativo de todos
            filtros.forEach(b => b.classList.remove('ativo'));
            
            // Adicionar classe ativo ao clicado
            this.classList.add('ativo');
            
            // Filtrar produtos
            const categoria = this.dataset.categoria;
            renderizarProdutos(categoria);
        });
    });
}

// ==========================================
// INICIALIZAR PÁGINA
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('📦 Catálogo carregado!');
    console.log(`📚 ${PRODUTOS.length} produtos disponíveis`);
    
    // Renderizar todos os produtos
    renderizarProdutos('todos');
    
    // Configurar filtros
    configurarFiltros();
    
    // Atualizar contador do carrinho
    atualizarContadorCarrinho();
    
    // Log dos produtos
    console.log('📋 Produtos:', PRODUTOS.map(p => `${p.id} - ${p.nome}`).join(', '));
});

// ==========================================
// EXPORTAR PARA USO EM OUTRAS PÁGINAS (opcional)
// ==========================================
// Se precisar usar em outras páginas, descomente:
// window.PRODUTOS = PRODUTOS;
// window.adicionarAoCarrinho = adicionarAoCarrinho;