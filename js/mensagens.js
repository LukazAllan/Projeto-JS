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

function inserirMensagem() {
    // var mensagem = {
    //         nome: "nome da pessoa",
    //         email: "email informado",
    //         mensagem: "a mensagem informada"}
    var agora = new Date();
    timeStamp = agora.toLocaleString("pt", { timeZone: "America/Sao_Paulo" });
    var mensagem = {
        nome: form.querySelector("#nome").value,
        email: form.querySelector("#email").value,
        mensagem: form.querySelector("#msg").value + "\nÀs " + timeStamp,
    };
    console.log(mensagem);
    var inserir = $.ajax({
        url: "https://app-p2-js-c88e9128234a.herokuapp.com/mensagens",
        method: "POST",
        data: JSON.stringify(mensagem),
        dataType: "json",
        async: false,
        contentType: "application/json",
    });
}

function mostrarMensagens(mensagens) {
    for (m of mensagens) {
        form.innerHTML =
            form.innerHTML +
            `<tr><td>${m['id']}</td><td>${m['nome']}</td><td>${m['email']}</td><td>${m['mensagem']}</td><td>Nada</td></tr>`;
    }
}

function load() {
    mostrarMensagens(obterMensagens());
}

load();