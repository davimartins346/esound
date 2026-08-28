const mostrarSenha = document.getElementById("mostrarSenha");

const senha = document.getElementById("senha");

mostrarSenha.addEventListener("click",()=>{

if(senha.type==="password"){

senha.type="text";

mostrarSenha.classList.replace("fa-eye","fa-eye-slash");

}else{

senha.type="password";

mostrarSenha.classList.replace("fa-eye-slash","fa-eye");

}

});

document.getElementById("loginForm").addEventListener("submit",(e)=>{

e.preventDefault();

const email=document.getElementById("email").value;

const senhaUsuario=document.getElementById("senha").value;

const usuarios=JSON.parse(localStorage.getItem("usuarios"))||[];

const usuario=usuarios.find(u=>u.email===email && u.senha===senhaUsuario);

if(usuario){

localStorage.setItem("usuarioLogado",JSON.stringify(usuario));

alert("Login realizado com sucesso!");

window.location.href="index.html";

}else{

alert("E-mail ou senha incorretos.");

}

});