let botao = window.document.getElementById("enviar");

function validando(){
    let retorno = validarUsuario();
    if (retorno) {
        window.location.href = "mensagens.html";
    } else {
        window.alert("Usuário ou senha inválidos!");
    }
}

botao.addEventListener("click", () => {
    console.log("Aqui se valida um usuário!");
    validando();
});

botao.addEventListener("keydown", (event) => {
    console.log("Aqui se valida um usuário!");
    if (event.key == 'Enter'){
       validando();
    }
});
