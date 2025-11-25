let botao = window.document.getElementById("enviar");
botao.addEventListener("click", () => {
    console.log("Aqui se envia uma mensagem!");
    inserirMensagem();
});

botao.addEventListener("keydown", (event) => {
    console.log("Aqui se envia uma mensagem!");
    if (event.key == 'Enter'){
        inserirMensagem();
    }
});
