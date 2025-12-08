/*
State
    is_visto(id)
    obterMensagens()
    excluirMensagem(arrayPos)
    pullMensagensOrigin()
    pullMensagensLocal()
    pushMensagensLocal()
    pullVistoAteLocal()
    pushVistoAteLocal()
    writeTabela()
    eraseTabela()
    atualizarMensagens()
    ler(id)
*/
class State {
    constructor(form) {
        this.form = form;
        this.vistoAte = 0;
        this.mensagens = [];
        this.tabela = new Tabela(form);
        this.listeners = new Listeners();
        console.debug(this.mensagens);
    }

    set_mensagens(mensagens) {
        console.debug("set_mensagens()");
        if (typeof mensagens === "undefined") {
            throw new Error("mensagens is undefined");
        } else {
            this.mensagens = mensagens;
        }
        //console.debug(this.mensagens);
        console.debug("set_mensagens() => Exit with code 0");
    }

    get_mensagens() {
        console.debug("get_mensagens()");
        if (this.mensagens == undefined) {
            throw new Error("mensagens is undefined");
        }
        //console.debug(this.mensagens);
        return this.mensagens;
    }

    is_visto(id) {
        if (id <= this.vistoAte) {
            return true;
        }
        return false;
    }

    obterMensagens() {
        console.debug("obterMensagens()");
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
        console.log(retorno[0]);
        console.debug(this.mensagens);

        return retorno;
    }

    excluirMensagem(arrayPos) {
        console.debug("excluirMensagem()");
        //window.alert(`Excluindo mensagem de index ${arrayPos}`);
        fazer = window.confirm(`Tem certeza que deseja excluir a mensagem de ID ${arrayPos[id]}? Esta ação não pode ser desfeita.`);
        if (fazer) {
            this.mensagens.splice(arrayPos, 1);
            document.querySelector(`#excluir${arrayPos}`).removeEventListener("click", () => {
                excluirMensagem(arrayPos);
            });
            document.querySelector(`#excluir${arrayPos}`).removeEventListener("keydown", (event) => {
                if (event.key == "Enter") {
                    excluirMensagem(arrayPos);
                }
            });
        }
        this.eraseTabela();
        this.writeTabela();
    }

    pullMensagensOrigin() {
        console.debug("pullMensagensOrigin()");
        this.set_mensagens(this.obterMensagens());
        console.debug(this.mensagens);
        console.debug("pullMensagensOrigin() => Exit with code 0");
    }

    pullMensagensLocal() {
        console.debug("pullMensagensLocal()");
        this.set_mensagens(JSON.parse(localStorage.getItem("mensagens")));
    }

    pushMensagensLocal() {
        console.debug("pushMensagensLocal()");
        localStorage.setItem("mensagens", JSON.stringify(this.mensagens));
        console.debug(this.mensagens);
    }

    pullVistoAteLocal() {
        console.debug("pullVistoAteLocal()");
        return Number.parseInt(localStorage.getItem("vistoAte"));
    }

    pushVistoAteLocal() {
        console.debug("pushVistoAteLocal()");
        localStorage.setItem("vistoAte", this.vistoAte.toString());
    }

    writeTabela() {
        console.debug("writeTabela()");
        this.tabela.exibirNaTabela(this.form, this.obterMensagens(), (id) => {
            if (id <= this.vistoAte) {
                return true;
            }
            return false;
        });
        console.debug(this.mensagens);
        // this.obterMensagens()
    }

    eraseTabela() {
        console.debug("eraseTabela()");
        this.tabela.limpaTabela(this.form);
    }

    atualizarMensagens() {
        console.debug("atualizarMensagens()");
        let O = this.obterMensagens();
        O.forEach((element) => {
            if (this.is_visto(element["id"])) {
                this.mensagens.push(element);
            }
        });
    }

    ler(id) {
        console.debug("ler()");
        if (!is_visto(id)) {
            console.log(`Lendo até mensagem de id ${id}`);
            this.set_visto_ate(id.toString());
            this.vistoAte = id;
        }
    }
}
