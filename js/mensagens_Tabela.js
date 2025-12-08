class Tabela {
    constructor(form) {
        this.form = form;
    }

    static constructMensagemLinha(mensagem, func, L, i) {
        Linha = document.createElement("tr");
        id = document.createElement("td");
        nome = document.createElement("td");
        email = document.createElement("td");
        msg = document.createElement("td");

        if (!func(mensagem['id'])) { // is_visto
            Linha.classList.add("not_seen");
        }

        Linha.id = (L - i).toString();
        id.innerText = mensagem['id'];
        nome.innerText = mensagem['nome'];
        email.innerText = mensagem['email'];
        msg.innerText = mensagem['mensagem'];

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
        return Linha;
    }

    limpaTabela(form) {
        let N = form.children.length;
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

    exibirNaTabela(form, mensagens, func) {
        this.limpaTabela(form);
        console.log('exibirNaTela()')
        let L = mensagens.length;
        for (let i = 1; i <= L; i++) {
            Linha = this.constructMensagemLinha(mensagens[L - i], func, L, i);
            form.appendChild(Linha);
        }
        console.log("Mensagens exibidas com sucesso!");
    }
}