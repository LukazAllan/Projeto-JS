var form = window.document.querySelector("#mensagens");
var state = new State(form);

// Listeners
function atualizar() {
    state.atualizarMensagens();
    state.writeTabela();
    state.putListeners();
}
document.querySelector("#atualizar").addEventListener("click", () => {
    atualizar();
});
document.querySelector("#atualizar").addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        atualizar();
    }
});

function ler_todos() {
    state.vistoAte = state.mensagens[state.mensagens.length - 1]["id"];
    state.pushVistoAteLocal();
    state.writeTabela();
    state.putListeners();
}
document.querySelector("#ler_todos").addEventListener("click", () => {
    ler_todos();
});
document.querySelector("#ler_todos").addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        ler_todos();
    }
});

// Initial
if (localStorage.getItem("mensagens") !== undefined) {
    console.debug("Fetching mensagens from local storage...");
    // state.mensagens = state.pullMensagensLocal();
    state.pullMensagensLocal();
} else {
    // state.mensagens = state.pullMensagensOrigin();
    console.debug("Fetching mensagens from origin...");
    state.pullMensagensOrigin();
    console.debug("Pushing mensagens to local storage...");
    state.pushMensagensLocal();
}

if (state.pullVistoAteLocal() !== null && state.pullVistoAteLocal() !== undefined && !isNaN(state.pullVistoAteLocal())) {
    state.vistoAte = state.pullVistoAteLocal();
} else {
    state.vistoAte = 0;
    state.pushVistoAteLocal();
}

state.writeTabela();
state.putListeners();
console.debug("Initial setup complete.");
