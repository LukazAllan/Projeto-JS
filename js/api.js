var form = window.document.getElementsByTagName("form")[0];

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

function validarUsuario(objLoginSenha) {
    //email: admin@admin.com
    //senha: '1234'

    var objLoginSenha = {
        email: form.querySelector("#email"),
        senha: form.querySelector("#senha"),
    };

    var retorno = false;

    var validacao = $.ajax({
        url: "https://app-p2-js-c88e9128234a.herokuapp.com/usuarios/validar",
        method: "POST",
        dataType: "json",
        async: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        contentType: "application/json",
        data: JSON.stringify(objLoginSenha),
    }).fail(function () {
        return retorno;
    });

    validacao.done(function (data) {
        retorno = data;
    });
    window.alert(retorno);
    return retorno;
}
