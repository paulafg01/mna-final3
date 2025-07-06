
 function calcularPontuacao() {
  const nome = document.getElementById("nome").value;
  const respostas = [
    document.querySelector('select[name="p1"]').value,
    document.querySelector('select[name="p2"]').value,
    document.querySelector('select[name="p3"]').value,
    document.querySelector('select[name="p4"]').value,
    document.querySelector('select[name="p5"]').value,
    document.querySelector('select[name="p6"]').value
  ];

  const pontuacao = respostas.reduce((total, val) => total + parseInt(val), 0);

  let mensagem = `<h3>Resultado MNA-SF</h3><p><strong>${nome}</strong> obteve <strong>${pontuacao} pontos</strong>.</p>`;

  if (pontuacao <= 11) {
    document.getElementById("mna-completo").style.display = "block";
    mensagem += `<p>Resultado indica possível risco nutricional. Prossiga com o MNA completo abaixo.</p>`;
  } else {
    document.getElementById("mna-completo").style.display = "none";
    mensagem += `<p>Estado nutricional aparentemente adequado. MNA completo não necessário.</p>`;
  }

  document.getElementById("resultado-sf").innerHTML = mensagem;
}

function finalizar() {
  const nome = document.getElementById("nome").value;
  const c1 = parseInt(document.querySelector('select[name="c1"]').value);
  const c2 = parseInt(document.querySelector('select[name="c2"]').value);

  const pontuacaoSF = [
    parseInt(document.querySelector('select[name="p1"]').value),
    parseInt(document.querySelector('select[name="p2"]').value),
    parseInt(document.querySelector('select[name="p3"]').value),
    parseInt(document.querySelector('select[name="p4"]').value),
    parseInt(document.querySelector('select[name="p5"]').value),
    parseInt(document.querySelector('select[name="p6"]').value)
  ].reduce((a, b) => a + b, 0);

  const pontuacaoCompleta = pontuacaoSF + c1 + c2;

  const resultadoFinal = `
    <h3>Resultado MNA Completo</h3>
    <p><strong>${nome}</strong> obteve <strong>${pontuacaoCompleta} pontos</strong> no total.</p>
  `;

  document.getElementById("resultado-final").innerHTML = resultadoFinal;

  gerarPDF(nome, pontuacaoCompleta);
}

function gerarPDF(nome, pontuacao) {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Mini Avaliação Nutricional (MNA)", 20, 20);
  doc.setFontSize(12);
  doc.text(`Nome do paciente: ${nome}`, 20, 40);
  doc.text(`Pontuação total: ${pontuacao}`, 20, 50);
  doc.save(`${nome}_MNA.pdf`);
}
