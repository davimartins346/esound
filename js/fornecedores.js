// ==========================================
// FORNECEDORES - MUSIC STORE
// fornecedores.js
// ==========================================

// Banco de dados (LocalStorage)
let fornecedores =
JSON.parse(localStorage.getItem("fornecedores")) || [];

// Elementos
const formulario = document.getElementById("formFornecedor");
const lista = document.getElementById("listaFornecedores");
const pesquisa = document.getElementById("pesquisaFornecedor");

// Campos
const idFornecedor = document.getElementById("idFornecedor");
const nome = document.getElementById("nome");
const contato = document.getElementById("contato");
const telefone = document.getElementById("telefone");
const email = document.getElementById("email");
const cidade = document.getElementById("cidade");

// ==========================================
// Salvar LocalStorage
// ==========================================

function salvarLocalStorage(){

    localStorage.setItem(
        "fornecedores",
        JSON.stringify(fornecedores)
    );

}

// ==========================================
// Limpar Formulário
// ==========================================

function limparFormulario(){

    idFornecedor.value = "";

    formulario.reset();

}

// ==========================================
// Renderizar Tabela
// ==========================================

function renderizarTabela(listaFornecedores = fornecedores){

    lista.innerHTML = "";

    if(listaFornecedores.length === 0){

        lista.innerHTML = `
        <tr>
            <td colspan="6" class="sem-registros">
                Nenhum fornecedor cadastrado.
            </td>
        </tr>
        `;

        return;

    }

    listaFornecedores.forEach((fornecedor)=>{

        lista.innerHTML += `

        <tr>

            <td>${fornecedor.nome}</td>

            <td>${fornecedor.contato}</td>

            <td>${fornecedor.telefone}</td>

            <td>${fornecedor.email}</td>

            <td>${fornecedor.cidade}</td>

            <td>

                <button
                class="btnEditar"
                onclick="editarFornecedor(${fornecedor.id})">

                    Editar

                </button>

                <button
                class="btnExcluir"
                onclick="excluirFornecedor(${fornecedor.id})">

                    Excluir

                </button>

            </td>

        </tr>

        `;

    });

}

// ==========================================
// Cadastro
// ==========================================

formulario.addEventListener("submit",(e)=>{

    e.preventDefault();

    const fornecedor = {

        id: idFornecedor.value
            ? Number(idFornecedor.value)
            : Date.now(),

        nome: nome.value,

        contato: contato.value,

        telefone: telefone.value,

        email: email.value,

        cidade: cidade.value

    };

    if(idFornecedor.value){

        const indice =
        fornecedores.findIndex(f=>f.id===fornecedor.id);

        fornecedores[indice]=fornecedor;

        alert("Fornecedor atualizado com sucesso!");

    }else{

        fornecedores.push(fornecedor);

        alert("Fornecedor cadastrado com sucesso!");

    }

    salvarLocalStorage();

    renderizarTabela();

    limparFormulario();

});

// ==========================================
// Editar
// ==========================================

function editarFornecedor(id){

    const fornecedor =
    fornecedores.find(f=>f.id===id);

    if(!fornecedor) return;

    idFornecedor.value = fornecedor.id;

    nome.value = fornecedor.nome;

    contato.value = fornecedor.contato;

    telefone.value = fornecedor.telefone;

    email.value = fornecedor.email;

    cidade.value = fornecedor.cidade;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

// ==========================================
// Excluir
// ==========================================

function excluirFornecedor(id){

    if(confirm("Deseja realmente excluir este fornecedor?")){

        fornecedores =
        fornecedores.filter(f=>f.id!==id);

        salvarLocalStorage();

        renderizarTabela();

    }

}

// ==========================================
// Pesquisa
// ==========================================

pesquisa.addEventListener("keyup",()=>{

    const texto =
    pesquisa.value.toLowerCase();

    const resultado =
    fornecedores.filter(f=>

        f.nome.toLowerCase().includes(texto) ||

        f.contato.toLowerCase().includes(texto) ||

        f.email.toLowerCase().includes(texto) ||

        f.cidade.toLowerCase().includes(texto)

    );

    renderizarTabela(resultado);

});

// ==========================================
// Inicialização
// ==========================================

renderizarTabela();