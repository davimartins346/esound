let carrinho =
JSON.parse(localStorage.getItem("carrinho")) || [];

const lista =
document.getElementById("listaCarrinho");

const total =
document.getElementById("total");

function atualizar(){

lista.innerHTML="";

let soma=0;

if(carrinho.length==0){

lista.innerHTML="<h2>Seu carrinho está vazio.</h2>";

total.innerHTML="Total: R$ 0,00";

return;

}

carrinho.forEach((produto,index)=>{

soma+=produto.preco;

lista.innerHTML+=`

<div class="item">

<img src="${produto.imagem}">

<div class="info">

<h3>${produto.nome}</h3>

<p>${produto.descricao}</p>

<div class="preco">

R$ ${produto.preco.toFixed(2)}

</div>

</div>

<div class="acoes">

<button onclick="remover(${index})">

<i class="fa-solid fa-trash"></i>

</button>

</div>

</div>

`;

});

total.innerHTML=

"Total: R$ "+soma.toFixed(2);

}

function remover(indice){

carrinho.splice(indice,1);

localStorage.setItem(

"carrinho",

JSON.stringify(carrinho)

);

atualizar();

}

document.getElementById("limparCarrinho")

.addEventListener("click",()=>{

if(confirm("Deseja limpar o carrinho?")){

carrinho=[];

localStorage.removeItem("carrinho");

atualizar();

}

});

atualizar();