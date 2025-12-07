class State {
    constructor(form) {
        this.form = form;
        this.vistoAte = 0;
        this.mensagens = [];
        this.tabela = new Tabela(form);
        this.listeners = new Listeners();
    }

    static is_visto(id) {
        if (id <= this.vistoAte) {
            return true;
        }
        return false;
    }
    
    obterMensagens() {
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

    excluirMensagem(arrayPos) {
        //window.alert(`Excluindo mensagem de index ${arrayPos}`);
        fazer = window.confirm(`Tem certeza que deseja excluir a mensagem de ID ${arrayPos[id]}? Esta ação não pode ser desfeita.`);
        if (fazer) {
            this.mensagens.splice(arrayPos, 1);
            document.querySelector(`#excluir${arrayPos}`).removeEventListener("click", () => {
                excluirMensagem(arrayPos);
            });
            document.querySelector(`#excluir${arrayPos}`).removeEventListener("keydown", (event) => {
                if (event.key == 'Enter') {
                    excluirMensagem(arrayPos);
                }
            });
        }
        this.eraseTabela();
        this.writeTabela()
    }

    pullMensagensOrigin() {
        this.mensagens = obterMensagens();
    }

    pullMensagensLocal() {
        this.mensagens = JSON.parse(localStorage.getItem("mensagens"));
    }

    pushMensagensLocal(mensagens) {
        localStorage.setItem("mensagens", JSON.stringify(this.mensagens));
    }

    pullVistoAteLocal() {
        return Number.parseInt(localStorage.getItem("vistoAte"));
    }

    pushVistoAteLocal() {
        localStorage.setItem("vistoAte", this.vistoAte.toString());
    }

    writeTabela(){
        this.tabela.exibirNaTabela(this.form, this.mensagens, this.is_visto);
    }

    eraseTabela(){
        this.tabela.limpaTabela(this.form);
    }
    
    atualizarMensagens() {
        let O = this.obterMensagens();
        O.forEach(element => {
            if (element['id'] > this.vistoAte) {
                this.mensagens.push(element);
            }
        });
    }
    
    ler(id) {
        if (!is_visto(id)) {
            console.log(`Lendo até mensagem de id ${id}`);
            this.set_visto_ate(id.toString());
            this.vistoAte = id;
        }
    
    }
}
