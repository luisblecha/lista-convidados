let convidados = [];
let indiceEdicao = -1;
let indiceRemocao = -1;
let erros = [];

function salvar() {
  // 1 pegar o valor
  let nome = document.getElementById("nome").value; // Pafúncio
  let idade = document.getElementById("idade").value;
  let email = document.getElementById("email").value;
  let valido = true;
  // validação dos campos

  if (!nome) {
    // (if com variável sem comparação): verifica se o nome é um valor válido, ou seja, (!= ""); != null; != false, etc.
    erros.push("Nome é obrigatório!");
    valido = false;
  }
  if (!idade) {
    erros.push("Idade é obrigatório!");
    valido = false;
  }
  if (!email) {
    erros.push("E-mail é obrigatório!");
    valido = false;
  }

  if (!valido) {
    // se não válido, return vazio para encerrar o método. Assim não prossegue.
    exibirErros();
    return;
  }

  // 2 adicionar no vetor, ou atualizar um convidado já existente.
  if (indiceEdicao > -1) {
    convidados[indiceEdicao] = { nome, idade, email };
  } else {
    convidados.push({ nome, idade, email });
  }
  // 3 atualizar o HTML
  atualizarLista();
  limparFormulario();
}

function exibirErros() {
  // pegando a seção de erros
  let secaoErros = document.getElementById("erros");
  // limpar a seção
  secaoErros.innerHTML = "";
  //exibe os erros
  for (i = 0; i < erros.length; i++) {
    secaoErros.innerHTML += `
        <div class="col col-7 alert alert-danger alert-dismissible fade show" role="alert">
            ${erros[i]}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
  }
  erros = []
}

function limparFormulario() {
  indiceEdicao = -1;
  document.getElementById("nome").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("email").value = "";
}

function atualizarLista() {
  // Pegar a section #lista
  let lista = document.getElementById("lista");
  // limpar a lista
  lista.innerHTML = "";
  // adiciona os elementos
  for (i = 0; i < convidados.length; i++) {
    // i = 0 1 2
    lista.innerHTML += `
        <tr> 
            <td>${convidados[i].nome}</td> 
            <td>${convidados[i].idade}</td> 
            <td>${convidados[i].email}</td> 
            <td>
                <button class="btn btn-warning" onclick="editar(${i})">Editar</button>
                <button class="btn btn-danger" data-toggle="modal" data-target="#alertaRemover" onclick="remover(${i})">Remover</button>
            </td>
        </tr>`;
  }
}

function remover(posicao) {
  indiceEdicao = posicao;
}

function confirmarRemocao(){
  convidados.splice(indiceRemocao, 1);
  atualizarLista();
}

function editar(posicao) {
  indiceEdicao = posicao; // cópia de referência
  document.getElementById("nome").value = convidados[posicao].nome;
  document.getElementById("idade").value = convidados[posicao].idade;
  document.getElementById("email").value = convidados[posicao].email;
}
