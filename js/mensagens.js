var form = window.document.querySelector("#mensagens");
var state = new State(form);


// Listeners
function atualizar() {
    state.atualizarMensagens();
    state.eraseTabela();
    state.writeTabela();
}
document.querySelector("#atualizar").addEventListener("click", () => {
    atualizar();
});
document.querySelector("#atualizar").addEventListener("keydown", (event) => {
    if (event.key == 'Enter') {
        atualizar();
    }
});

function ler_todos() {
    state.vistoAte = state.mensagens[state.mensagens.length - 1]['id'];
    state.pushVistoAteLocal();
    state.eraseTabela();
    state.writeTabela();
}
document.querySelector("#ler_todos").addEventListener("click", () => {
    ler_todos();
});
document.querySelector("#ler_todos").addEventListener("keydown", (event) => {
    if (event.key == 'Enter') {
        ler_todos();
    }
});

L = state.mensagens.length;
for (let i = 1; i <= L; i++) {
    Linha = document.querySelector(`#${state.mensagens[L - i]['id']}`);
    /*Supunhetamos que temos um L == 5,
    i é um contador que vai de 1 a 5, e incrementando, id's diminuem
    no entanto, os ids das mensagens não são sequenciais.
    na primeira iteração, queremos o 5° elemento com id 1579, obtemos indice 4 (5 - 1 = 4)
    na segunda iteração, queremos o 4° elemento com id 1532, obtemos indice 3 (5 - 2 = 3)
    na terceira iteração, queremos o 3° elemento com id 1490, obtemos indice 2 (5 - 3 = 2)
    na quarta iteração, queremos o 2° elemento com id 1450, obtemos indice 1 (5 - 4 = 1)
    na quinta iteração, queremos o 1° elemento com id 1400, obtemos indice 0 (5 - 5 = 0)
    então, na elésima interação, queremos o L° elemento com id X obtemos indice (L - i)
    */
    
    document.querySelector(`#excluir${L - i}`).addEventListener("click", () => {
        state.excluirMensagem(L-i);
    });
    document.querySelector(`#excluir${L - i}`).addEventListener("keydown", (event) => {
        if (event.key == 'Enter') {
            state.excluirMensagem(L-i);
        }
    });

    document.querySelector(`#ler${L - i}`).addEventListener("click", () => {
        ler(mensagens[L - i]['id']);
    });
    document.querySelector(`#ler${L - i}`).addEventListener("keydown", (event) => {
        if (event.key == 'Enter') {
            ler(mensagens[L - i]['id']);
        }
    });
}

// Initial
if (state.pullMensagensLocal() !== null) {
    state.mensagens = state.pullMensagensLocal();
    state.pullVistoAteLocal();
} else {
    state.mensagens = state.pullMensagensOrigin();
    state.push_MensagensLocal(state.mensagens);
}

state.writeTabela();