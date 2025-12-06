var form = window.document.querySelector("#mensagens");
var vistoAte = 0;

function get_visto_ate(){
    vistoAte = Number.parseInt(localStorage.getItem("vistoAte"));
}
function set_visto_ate(){
    localStorage.setItem("vistoAte", vistoAte.toString());
}

function is_visto(id) {
    if (id > vistoAte) {
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

function mostrarMensagens(mensagens) {
    for (m of mensagens) {
        if (is_visto(m['id'])) {
            form.innerHTML =
                form.innerHTML +
                `<tr><td>${m['id']}</td><td>${m['nome']}</td><td>${m['email']}</td><td>${m['mensagem']}</td><td><div class="buttons">\
       <button id="enviar" class="button">Apagar</button>\
      </div></td></tr>`;
        } else {
            form.innerHTML =
            form.innerHTML +
            `<tr class="not_seen"><td>${m['id']}</td><td>${m['nome']}</td><td>${m['email']}</td><td>${m['mensagem']}</td><td><div class="buttons">\
       <button id="enviar" class="button">Apagar</button>\
      </div></td></tr>`;
        }

    }
}

function load() {
    mostrarMensagens(obterMensagens());
}

function saveMensagens(mensagens) {
    localStorage.setItem("mensagens", JSON.stringify(mensagens));
}

function loadMensagens() {
    return JSON.parse(localStorage.getItem("mensagens"));
}
load();