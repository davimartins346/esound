const form = document.getElementById("checkoutForm");

form.addEventListener("submit", function(e){

e.preventDefault();

const pedido = {

cliente:document.getElementById("nome").value,

cpf:document.getElementById("cpf").value,

telefone:document.getElementById("telefone").value,

endereco:document.getElementById("endereco").value,

cidade:document.getElementById("cidade").value,

estado:document.getElementById("estado").value,

pagamento:document.getElementById("pagamento").value,

produtos:JSON.parse(localStorage.getItem("carrinho")) || [],

data:new Date().toLocaleString()

};

let pedidos =
JSON.parse(localStorage.getItem("pedidos")) || [];

pedidos.push(pedido);

localStorage.setItem(
"pedidos",
JSON.stringify(pedidos)
);

localStorage.removeItem("carrinho");

alert("Pedido realizado com sucesso!");

window.location.href="historico.html";

});