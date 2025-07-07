
 
  
  

function calcularMNA() {
  const form = document.getElementById("mna-sf");
  const valores = Array.from(form.elements)
    .filter(el => el.tagName === "SELECT")
    .map(el => parseInt(el.value));

  if (valores.includes(NaN)) {
    alert("Por favor, responda todas as perguntas do MNA-SF.");
    return;
  }

  const soma = valores.reduce((acc, val) => acc + val, 0);
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = `<strong>Pontuação MNA-SF:</strong> ${soma} pontos.`;

  if (soma <= 11) {
    document.getElementById("mna-completo").style.display = "block";
    renderizarPerguntasCompletas();
  } else {
    const classificacao = soma >= 12 ? "Estado nutricional adequado" : "Risco de desnutrição";
    resultadoDiv.innerHTML += `<br><strong>Classificação:</strong> ${classificacao}`;
    document.getElementById("gerarPDF").style.display = "block";
  }
}

function renderizarPerguntasCompletas() {
  const perguntas = [
    "7. Vive independente?",
    "8. Toma mais de 3 medicamentos por dia?",
    "9. Lesões de pele ou escaras?",
    "10. 2 ou mais refeições completas ao dia?",
    "11. Consome leite, derivados ou proteína diariamente?",
    "12. Consome frutas ou legumes diariamente?",
    "13. Ingestão hídrica diária adequada?",
    "14. Modo de alimentação (sozinho, ajuda, alimentado)?",
    "15. Autoavaliação do estado nutricional",
    "16. Autoavaliação da saúde em relação a outros da mesma idade",
    "17. Circunferência da panturrilha > 31 cm?",
    "18. IMC (novamente)"
  ];

  const opcoes = [
    ["1 = sim", "0 = não"],
    ["0 = sim", "1 = não"],
    ["0 = sim", "1 = não"],
    ["0 = não", "1 = sim"],
    ["0 = não", "1 = sim"],
    ["0 = não", "1 = sim"],
    ["0 = não", "1 = sim"],
    ["2 = sozinho", "1 = com ajuda", "0 = alimentado por terceiros"],
    ["0 = se considera desnutrido", "1 = não sabe", "2 = considera-se bem nutrido"],
    ["0 = pior", "1 = igual", "2 = melhor"],
    ["0 = não", "1 = sim"],
    ["0 = <19", "1 = 19–21", "2 = 21–23", "3 = >23"]
  ];

  const form = document.getElementById("form-mna-completo");
  form.innerHTML = "";

  perguntas.forEach((texto, i) => {
    const div = document.createElement("div");
    div.className = "pergunta";
    const label = document.createElement("label");
    label.textContent = texto;
    const select = document.createElement("select");
    select.name = `q${i + 7}`;
    select.required = true;

    const optDefault = document.createElement("option");
    optDefault.value = "";
    optDefault.textContent = "Selecione";
    select.appendChild(optDefault);

    opcoes[i].forEach(op => {
      const option = document.createElement("option");
      const [valor, texto] = op.split(" = ");
      option.value = valor;
      option.textContent = texto;
      select.appendChild(option);
    });

    div.appendChild(label);
    div.appendChild(select);
    form.appendChild(div);
  });

  const botaoFinal = document.createElement("button");
  botaoFinal.type = "button";
  botaoFinal.textContent = "Calcular MNA Completo";
  botaoFinal.onclick = calcularMNACompleto;
  form.appendChild(botaoFinal);
}

function calcularMNACompleto() {
  const valoresSF = Array.from(document.getElementById("mna-sf").elements)
    .filter(el => el.tagName === "SELECT")
    .map(el => parseInt(el.value));
  const somaSF = valoresSF.reduce((acc, val) => acc + val, 0);

  const valoresC = Array.from(document.getElementById("form-mna-completo").elements)
    .filter(el => el.tagName === "SELECT")
    .map(el => parseInt(el.value));

  if (valoresC.includes(NaN)) {
    alert("Responda todas as perguntas do MNA completo.");
    return;
  }

  const somaC = valoresC.reduce((acc, val) => acc + val, 0);
  const total = somaSF + somaC;

  let classificacao = "";
  if (total >= 12) classificacao = "Estado nutricional adequado";
  else if (total >= 8) classificacao = "Risco de desnutrição";
  else classificacao = "Desnutrido";

  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = `<strong>Pontuação total MNA:</strong> ${total} pontos.<br><strong>Classificação:</strong> ${classificacao}`;

  document.getElementById("gerarPDF").style.display = "block";
}

function gerarPDF() {
  const nome = document.getElementById("nomePaciente").value.trim();
  const resultado = document.getElementById("resultado").innerText;

  const janela = window.open("", "_blank");
  janela.document.write(`<html><head><title>MNA - Resultado</title></head><body>`);
  janela.document.write(`<h1>Mini Avaliação Nutricional</h1>`);
  janela.document.write(`<p><strong>Paciente:</strong> ${nome || "(sem nome)"}</p>`);
  janela.document.write(`<p>${resultado.replace(/\n/g, "<br>")}</p>`);
  janela.document.write(`</body></html>`);
  janela.document.close();
  janela.print();
}
