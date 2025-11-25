let botao = window.document.getElementById("enviar");

botao.addEventListener("click", () => {
    console.log("Aqui se valida um usuário!");
    validarUsuario();
});

botao.addEventListener("keydown", (event) => {
    console.log("Aqui se valida um usuário!");
    if (event.key == 'Enter'){
       validarUsuario();
    }
});
