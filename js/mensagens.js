var form = window.document.querySelector("#mensagens");
var vistoAte;
var mensagens;

function get_visto_ate(){
    return Number.parseInt(localStorage.getItem("vistoAte"));
}
function set_visto_ate(inteiro){
    localStorage.setItem("vistoAte", inteiro.toString());
}

function get_mensagens(){
    return JSON.parse(localStorage.getItem("mensagens"));
}

function set_mensagens(mensagens){
    localStorage.setItem("mensagens", JSON.stringify(mensagens));
}

function is_visto(id) {
    if (id > vistoAte) {
        return true;
    }
    return false;
}

document.querySelector("#atualizar").addEventListener("click", () => {
    load();
});
document.querySelector("#atualizar").addEventListener("keydown", (event) => {
    if (event.key == 'Enter'){
        load();
    }
});

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

function mostrarMensagens(mensagens) {
    let L = mensagens.length;
    for (let i = 1; i <= mensagens.length; i++) {
    // for (m of mensagens) {
        if (is_visto(mensagens[L-i]['id'])) {
            form.innerHTML =
                form.innerHTML +
                `<tr><td>${mensagens[L-i]['id']}</td><td>${mensagens[L-i]['nome']}</td><td>${mensagens[L-i]['email']}</td><td>${mensagens[L-i]['mensagem']}</td><td><div class="buttons">\
       <button id="enviar" class="button">Apagar</button>\
      </div></td></tr>`;
        } else {
            form.innerHTML =
            form.innerHTML +
            `<tr class="not_seen"><td>${mensagens[L-i]['id']}</td><td>${mensagens[L-i]['nome']}\
            </td><td>${mensagens[L-i]['email']}</td><td>${mensagens[L-i]['mensagem']}</td><td>\
            <div class="buttons"><button id="apagar${L-i}" class="button">Apagar</button>\
            </div></td></tr>`;
        }
        document.querySelector(`#apagar${L-i}`).addEventListener("click", () => {
            apagarMensagem(mensagens[L-i]['id']);
        });
        document.querySelector(`#apagar${L-i}`).addEventListener("keydown", (event) => {
            if (event.key == 'Enter'){
                apagarMensagem(mensagens[L-i]['id']);
            }
        });

    }

}

function clear() {
    let N = document.querySelector("#mensagens").children.length;
    for (let i = 0; i < N; i++) {
        document.querySelector(`#apagar${i}`).removeEventListener("click", () => {
            apagarMensagem(i);
        });
        document.querySelector(`#apagar${i}`).removeEventListener("keydown", (event) => {
            if (event.key == 'Enter'){
                apagarMensagem(i);
            }
        });
    }
    form.innerHTML = '';
}

function load() {
    clear();
    mostrarMensagens(obterMensagens());
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

load();