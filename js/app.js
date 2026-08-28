// Carrinho
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ==============================
// Atualizar contador
// ==============================

function atualizarContador() {

    const contador = document.querySelector("#contadorCarrinho");

    if (contador) {

        contador.innerText = carrinho.length;

    }

}

atualizarContador();

// ==============================
// Toast
// ==============================

function mostrarMensagem(texto) {

    let toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = texto;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("mostrar");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("mostrar");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2500);

}

// ==============================
// Produtos
// ==============================

const produtos = [

    {

        id: 1,

        nome: "Violão Yamaha",

        preco: 1299.90,

        imagem: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500"

    },

    {

        id: 2,

        nome: "Guitarra Fender",

        preco: 5499.90,

        imagem: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500"

    },

    {

        id: 3,

        nome: "Teclado Roland",

        preco: 3890.00,

        imagem: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500"

    },

    {

        id: 4,

        nome: "Bateria Pearl",

        preco: 6999.90,

        imagem: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500"

    }

];

// ==============================
// Botões Comprar
// ==============================

const botoes = document.querySelectorAll(".card button");

botoes.forEach((botao, index) => {

    botao.addEventListener("click", () => {

        carrinho.push(produtos[index]);

        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        atualizarContador();

        mostrarMensagem("Produto adicionado ao carrinho!");

    });

});

// ==============================
// Pesquisa
// ==============================

const campoPesquisa = document.querySelector(".pesquisa input");

if (campoPesquisa) {

    campoPesquisa.addEventListener("keyup", () => {

        let texto = campoPesquisa.value.toLowerCase();

        let cards = document.querySelectorAll(".card");

        cards.forEach(card => {

            let nome = card.querySelector("h3").innerText.toLowerCase();

            if (nome.includes(texto)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

// ==============================
// Newsletter
// ==============================

const newsletter = document.querySelector(".newsletter button");

if (newsletter) {

    newsletter.addEventListener("click", () => {

        const email = document.querySelector(".newsletter input").value;

        if (email === "") {

            mostrarMensagem("Digite um e-mail.");

            return;

        }

        mostrarMensagem("Cadastro realizado com sucesso!");

        document.querySelector(".newsletter input").value = "";

    });

}

// ==============================
// Efeito Header
// ==============================

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 80) {

        header.style.boxShadow = "0px 5px 20px rgba(0,0,0,.25)";

    } else {

        header.style.boxShadow = "none";

    }

});

// ==============================
// Scroll suave
// ==============================

document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", (e) => {

        const href = link.getAttribute("href");

        if (href.startsWith("#")) {

            e.preventDefault();

            document.querySelector(href).scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ==============================
// Mensagem inicial
// ==============================

console.log("E-Sound carregada com sucesso!");