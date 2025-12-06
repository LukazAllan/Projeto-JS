var form = window.document.querySelector("#mensagens");
var vistoAte;
var mensagens;

function get_visto_ate() {
    return Number.parseInt(localStorage.getItem("vistoAte"));
}
function set_visto_ate(inteiro) {
    localStorage.setItem("vistoAte", inteiro.toString());
}

function get_mensagens() {
    return JSON.parse(localStorage.getItem("mensagens"));
}

function set_mensagens(mensagens) {
    localStorage.setItem("mensagens", JSON.stringify(mensagens));
}

function is_visto(id) {
    if (id <= vistoAte) {
        return true;
    }
    return false;
}

function obterMensagens() {
    var retorno = [];

    var consulta = $.ajax({
        url: "https://app-p2-js-c88e9128234a.herokuapp.com/mensagens",
        method: "GET",
        dataType: "json",
        async: false,
    }).fail(function () {
        return retorno;
    });

    consulta.done(function (data) {
        retorno = data;
    });
    return retorno;
}

function ler(id) {
    if (!is_visto(id)) {
        console.log(`Lendo até mensagem de id ${id}`);
        set_visto_ate(id.toString());
        vistoAte = id;
        load();
    }

}

function mostrarMensagens(mensagens) {
    let L = mensagens.length;
    for (let i = 1; i <= mensagens.length; i++) {
        Linha = document.createElement("tr");
        id = document.createElement("td");
        nome = document.createElement("td");
        email = document.createElement("td");
        msg = document.createElement("td");

        if (!is_visto(mensagens[L - i]['id'])) {
            Linha.classList.add("not_seen");
        }

        id.innerText = mensagens[L - i]['id'];
        nome.innerText = mensagens[L - i]['nome'];
        email.innerText = mensagens[L - i]['email'];
        msg.innerText = mensagens[L - i]['mensagem'];

        botoes = document.createElement("td");
        botao_excluir = document.createElement("button");
        botao_excluir.classList.add("button");
        botao_excluir.id = `excluir${L - i}`;
        botao_excluir.innerText = "❌";
        botao_ler = document.createElement("button");
        botao_ler.classList.add("button");
        botao_ler.id = `ler${L - i}`;
        botao_ler.innerText = "📥";
        botoes.appendChild(botao_excluir);
        botoes.appendChild(botao_ler);

        Linha.appendChild(id);
        Linha.appendChild(nome);
        Linha.appendChild(email);
        Linha.appendChild(msg);
        Linha.appendChild(botoes);

        form.appendChild(Linha);

        document.querySelector(`#excluir${L - i}`).addEventListener("click", () => {
            excluirMensagem(mensagens[L - i]['id']);
        });
        document.querySelector(`#excluir${L - i}`).addEventListener("keydown", (event) => {
            if (event.key == 'Enter') {
                excluirMensagem(mensagens[L - i]['id']);
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

}

function clear() {
    let N = document.querySelector("#mensagens").children.length;
    for (let i = 0; i < N; i++) {
        document.querySelector(`#excluir${i}`).removeEventListener("click", () => {
            excluirMensagem(i);
        });
        document.querySelector(`#excluir${i}`).removeEventListener("keydown", (event) => {
            if (event.key == 'Enter') {
                excluirMensagem(i);
            }
        });
    }
    form.innerHTML = '';
}

function load() {
    clear();
    mostrarMensagens(mensagens);
    //vistoAte = mensagens[mensagens.length - 1]['id'];
    set_visto_ate(vistoAte);
    console.log('loaded');
}


function saveMensagens(mensagens) {
    localStorage.setItem("mensagens", JSON.stringify(mensagens));
}

function loadMensagens() {
    return JSON.parse(localStorage.getItem("mensagens"));
}

if (get_visto_ate() !== NaN) {
    vistoAte = get_visto_ate();
} else {
    vistoAte = 0;
    set_visto_ate(vistoAte);
}


// Listeners
function atualizar() {
    mensagens = obterMensagens();
    set_mensagens(mensagens);
    load();
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
    vistoAte = Number.parseInt(form.children[0].children[0].innerText);
    set_visto_ate(vistoAte);
    load();
}
document.querySelector("#ler_todos").addEventListener("click", () => {
    ler_todos();
});
document.querySelector("#ler_todos").addEventListener("keydown", (event) => {
    if (event.key == 'Enter') {
        ler_todos();
    }
});
// Initial
mensagens = obterMensagens();
set_mensagens(mensagens);
load();