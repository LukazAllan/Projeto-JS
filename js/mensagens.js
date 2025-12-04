var form = window.document.querySelector("#mensagens");

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
        form.innerHTML =
            form.innerHTML +
            `<tr><td>${m['id']}</td><td>${m['nome']}</td><td>${m['email']}</td><td>${m['mensagem']}</td><td><div class="buttons">\
       <button id="enviar" class="button">Apagar</button>\
      </div></td></tr>`;
    }
}

function load() {
    mostrarMensagens(obterMensagens());
}

load();