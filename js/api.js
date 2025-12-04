var form = window.document.getElementsByTagName("form")[0];

function validarUsuario(objLoginSenha) {
    //email: admin@admin.com
    //senha: '1234'

    var objLoginSenha = {
        email: form.querySelector("#email").value,
        senha: form.querySelector("#senha").value,
    };
    console.log(objLoginSenha);

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
