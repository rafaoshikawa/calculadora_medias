const form = document.getElementById("form-atividade");
let linhas = ""; //para adicionar linhas novas
const atividades = []; //array de atividades vazio
const notas = []; //array de notas vazias
let mediaAprovado = parseFloat(prompt("Digite o valor da média de Aprovação"));
const aprovado = '<span class = "resultado aprovado"><b>aprovado</b></span>';
const reprovado = '<span class = "resultado reprovado"><b>reprovado</b></span>';

form.addEventListener("submit", function (e) {
  e.preventDefault();
  adicionaLinha();
  atualizaTabela();
  atualizaMediaFinal();
});

function adicionaLinha() {
  //capturar os campos de nome da atividade e nota
  const inputNomeAtividade = document.getElementById("nome-atividade");
  const inputNotaAtividade = document.getElementById("nota-atividade");
  let linha = "<tr>"; //pense que esse TR abre o escopo para o codigo a seguir

  if (atividades.includes(inputNomeAtividade.value)) {
    alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
  } else {
    atividades.push(inputNomeAtividade.value); //puxar todo array de atividade preenchido pelo usuario
    notas.push(parseFloat(inputNotaAtividade.value)); //puxar todo array de notas preenchido pelo usuario

    //isso tudo é basicamente uma operaçao logica para a variavel linha
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${
      inputNotaAtividade.value >= mediaAprovado ? "aprovado" : "reprovado"
    } </td>`;

    linha += "</tr>"; //e esse tr fecha o escopo para o codigo acima
    linhas += linha; //adiciona linhas novas para cada submit
  }

  //para limpar os inputs depois de clicar em submit
  inputNomeAtividade.value = "";
  inputNotaAtividade.value = "";
}

function atualizaTabela() {
  const corpoTabela = document.querySelector("tbody");
  corpoTabela.innerHTML = linhas; //necessario usar a variavel linhas para a criação de novas linhas, se usarmos a variavel linha ele só vai substituir a linha criada
}

function atualizaMediaFinal() {
  const mediaFinal = calculaMediaFinal();
  document.getElementById("media-final-valor").innerHTML = mediaFinal.toFixed(2) //toFixed limite a casas decimais;
  document.getElementById("media-final-resultado").innerHTML =
    mediaFinal >= mediaAprovado ? aprovado : reprovado;
}

function calculaMediaFinal() {
  let somaNotas = 0;
  for (let i = 0; i < notas.length; i++) {
    somaNotas = somaNotas + notas[i];
  }
  return somaNotas / notas.length;
}
