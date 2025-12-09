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
    atualizarMensagens()
    ler(id)
*/
class State {
    constructor(form) {
        this.form = form;
        this.vistoAte = 0;
        this.mensagens = [];
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

    set_visto_ate(n) {
        console.debug("set_visto_ate()");
        this.vistoAte = n;
        this.pushVistoAteLocal();
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

    excluirMensagem(arrayPos, id) {
        console.debug("excluirMensagem()");
        console.debug(`excluirMensagem() recebeu arrayPos: ${arrayPos}, id: ${id}`);
        var fazer = window.confirm(`Tem certeza que deseja excluir a mensagem ${arrayPos} de ID ${this.mensagens[arrayPos]["id"]}? Esta ação não pode ser desfeita.`);
        // this.form.removeChild(this.form.children[this.form.childElementCount - 1 - arrayPos]);
        if (fazer) {
            this.set_mensagens(this.mensagens.filter((mensagem) => mensagem["id"] != id));
            //console.log(this.mensagens.splice(arrayPos, 1));
        }
        this.pushMensagensLocal();
        this.writeTabela();
        this.putListeners();
        console.debug("excluirMensagem() => Exit with code 0");
        // this.set_mensagens(as_mensagens);
        // this.pushMensagensLocal();
        // this.eraseTabela();
        // this.writeTabela();
        // Essa parte abaixo ARRANCA a mensagem da tabela visualmente
        //this.form.removeChild(this.form.children[arrayPos]);
        //this.form.removeChild(this.form.children[this.form.childElementCount - 1 - arrayPos]);
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
        this.exibirNaTabela(this.form, this.get_mensagens(), (id) => {
            if (id <= this.vistoAte) {
                return true;
            }
            return false;
        });
        console.debug(this.mensagens);
        // this.obterMensagens()
    }

    atualizarMensagens() {
        console.debug("atualizarMensagens()");
        let pulled = this.obterMensagens();
        for (let n of pulled) {
            if (this.is_visto(n["id"] + 1)) {
                continue;
            } else {
                this.mensagens.push(n);
            }
        }
        this.pushMensagensLocal();
    }

    ler(id) {
        console.debug("ler()");
        var fazer = window.confirm(`Tem certeza que leu até a mensagem de ID ${id}? Esta ação não pode ser desfeita.`);
        if (id > this.vistoAte) {
            console.log(`Lendo até mensagem de id ${id}`);
            this.set_visto_ate(id);
        }
        this.writeTabela();
        this.putListeners();
        console.debug("ler() => Exit with code 0");
    }

    putListeners() {
        for (let i = 0; i < state.mensagens.length; i++) {
            console.debug(`putListeners()`);
            //Linha = document.querySelector(`#${state.mensagens[i]["id"]}`);

            document.querySelector(`#excluir${i}`).addEventListener("click", () => {
                state.excluirMensagem(i, state.mensagens[i]["id"]);
            });
            document.querySelector(`#excluir${i}`).addEventListener("keydown", (event) => {
                if (event.key == "Enter") {
                    state.excluirMensagem(i, state.mensagens[i]["id"]);
                }
            });

            document.querySelector(`#ler${i}`).addEventListener("click", () => {
                state.ler(this.mensagens[i]["id"]);
            });
            document.querySelector(`#ler${i}`).addEventListener("keydown", (event) => {
                if (event.key == "Enter") {
                    state.ler(this.mensagens[i]["id"]);
                }
            });
        }
    }

    constructMensagemLinha(mensagem, n) {
        // console.log('exibirNaTela()');
        var Linha = document.createElement("tr");
        var id = document.createElement("td");
        var nome = document.createElement("td");
        var email = document.createElement("td");
        var msg = document.createElement("td");

        if (!this.is_visto(mensagem["id"])) {
            // is_visto
            Linha.classList.add("not_seen");
        }

        Linha.id = n.toString();
        id.innerText = mensagem["id"];
        nome.innerText = mensagem["nome"];
        email.innerText = mensagem["email"];
        msg.innerText = mensagem["mensagem"];

        var botoes = document.createElement("td");
        var botao_excluir = document.createElement("button");
        botao_excluir.classList.add("button");
        botao_excluir.id = `excluir${n}`;
        botao_excluir.innerText = "❌";
        var botao_ler = document.createElement("button");
        botao_ler.classList.add("button");
        botao_ler.id = `ler${n}`;
        botao_ler.innerText = "📥";
        botoes.appendChild(botao_excluir);
        botoes.appendChild(botao_ler);

        Linha.appendChild(id);
        Linha.appendChild(nome);
        Linha.appendChild(email);
        Linha.appendChild(msg);
        Linha.appendChild(botoes);
        console.log("constructMensagemLinha() => return");
        return Linha;
    }

    limpaTabela() {
        console.log("limpaTabela()");
        while (this.form.firstChild) {
            this.form.removeChild(this.form.firstChild);
        }
        //this.form.innerHTML = "";
        console.log("Tabela limpa com sucesso!");
    }

    exibirNaTabela(form, func) {
        console.log("exibirNaTabela()");
        this.limpaTabela(form);
        let Linha;
        for (let i = this.mensagens.length - 1; i >= 0; i--) {
            Linha = this.constructMensagemLinha(this.mensagens[i], i);
            form.appendChild(Linha);
        }
        console.log("Mensagens exibidas com sucesso!");
    }
}
