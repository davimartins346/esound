const pedidos =
JSON.parse(localStorage.getItem("pedidos")) || [];

const lista =
document.getElementById("listaPedidos");

if(pedidos.length===0){

lista.innerHTML=`

<div class="semPedidos">

<i class="fa-solid fa-box-open fa-4x"></i>

<h2>Nenhuma compra realizada.</h2>

</div>

`;

}else{

pedidos.reverse().forEach((pedido,indice)=>{

let total=0;

let produtosHTML="";

pedido.produtos.forEach(produto=>{

total+=produto.preco;

produtosHTML+=`

<div class="produto">

<span>${produto.nome}</span>

<strong>

R$ ${produto.preco.toFixed(2)}

</strong>

</div>

`;

});

lista.innerHTML+=`

<div class="pedido">

<h2>

Pedido #${pedidos.length-indice}

</h2>

<p>

<strong>Cliente:</strong>

${pedido.cliente}

</p>

<p>

<strong>CPF:</strong>

${pedido.cpf}

</p>

<p>

<strong>Telefone:</strong>

${pedido.telefone}

</p>

<p>

<strong>Pagamento:</strong>

${pedido.pagamento}

</p>

<p>

<strong>Data:</strong>

${pedido.data}

</p>

<div class="produtos">

<h3>Produtos</h3>

${produtosHTML}

</div>

<div class="total">

Total: R$ ${total.toFixed(2)}

</div>

</div>

`;

});

}