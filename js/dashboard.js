const usuarios =
JSON.parse(localStorage.getItem("usuarios")) || [];

const pedidos =
JSON.parse(localStorage.getItem("pedidos")) || [];

const produtos =
JSON.parse(localStorage.getItem("produtos")) || [];

document.getElementById("clientes").innerText =
usuarios.length;

document.getElementById("produtos").innerText =
produtos.length || 30;

document.getElementById("pedidos").innerText =
pedidos.length;

let faturamento = 0;

pedidos.forEach(pedido=>{

pedido.produtos.forEach(produto=>{

faturamento += produto.preco;

});

});

document.getElementById("faturamento").innerText =

"R$ " + faturamento.toFixed(2);

// ===========================
// Gráfico
// ===========================

const ctx =
document.getElementById("graficoVendas");

new Chart(ctx,{

type:"bar",

data:{

labels:[

"Clientes",

"Produtos",

"Pedidos"

],

datasets:[{

label:"Quantidade",

data:[

usuarios.length,

produtos.length || 30,

pedidos.length

]

}]

}

});