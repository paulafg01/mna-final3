
vfunction calcularPontuacao() {
  const formSF = document.getElementById('form-sf');
  const nome = document.getElementById('nome').value;
  let scoreSF = 0;

  for (let i = 1; i <= 6; i++) {
    const valor = parseInt(formSF.elements['p' + i].value) || 0;
    scoreSF += valor;
  }

  const resultadoSF = document.getElementById('resultado-sf');
  resultadoSF.innerHTML = `Pontuação MNA-SF: <strong>${scoreSF}</strong>`;

  if (scoreSF <= 11) {
    document.getElementById('mna-completo').style.display = 'block';
    resultadoSF.innerHTML += "<br><strong>⚠️ Resultado ≤ 11: Continuar com MNA Completo.</strong>";
  } else {
    resultadoSF.innerHTML += "<br><strong>✅ Resultado > 11: Estado nutricional adequado.</strong>";
  }

  // Salva o nome para reutilizar no PDF final
  window.nomePaciente = nome;
  window.scoreSF = scoreSF;
}

function finalizar() {
  let scoreCompleto = 0;
  const formCompleto = document.getElementById('mna-completo');

  for (let i = 1; i <= 12; i++) {
    const valor = parseInt(formCompleto.elements['c' + i].value) || 0;
    scoreCompleto += valor;
  }

  const totalFinal = window.scoreSF + scoreCompleto;

  const resultadoFinal = document.getElementById('resultado-final');
  resultadoFinal.innerHTML = `
    <p>Pontuação final: <strong>${totalFinal}</strong></p>
    <p>Paciente: <strong>${window.nomePaciente}</strong></p>
  `;

  gerarPDF(window.nomePaciente, totalFinal);
}

function gerarPDF(nome, pontuacao) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text(`Mini Avaliação Nutricional (MNA)`, 20, 20);
  doc.text(`Paciente: ${nome}`, 20, 40);
  doc.text(`Pontuação total: ${pontuacao}`, 20, 50);

  doc.save(`MNA_${nome}.pdf`);
}function calcularPontuacao() {
  const formSF = document.getElementById('form-sf');
  const nome = document.getElementById('nome').value;
  let scoreSF = 0;

  for (let i = 1; i <= 6; i++) {
    const valor = parseInt(formSF.elements['p' + i].value) || 0;
    scoreSF += valor;
  }

  const resultadoSF = document.getElementById('resultado-sf');
  resultadoSF.innerHTML = `Pontuação MNA-SF: <strong>${scoreSF}</strong>`;

  if (scoreSF <= 11) {
    document.getElementById('mna-completo').style.display = 'block';
    resultadoSF.innerHTML += "<br><strong>⚠️ Resultado ≤ 11: Continuar com MNA Completo.</strong>";
  } else {
    resultadoSF.innerHTML += "<br><strong>✅ Resultado > 11: Estado nutricional adequado.</strong>";
  }

  // Salva o nome para reutilizar no PDF final
  window.nomePaciente = nome;
  window.scoreSF = scoreSF;
}

function finalizar() {
  let scoreCompleto = 0;
  const formCompleto = document.getElementById('mna-completo');

  for (let i = 1; i <= 12; i++) {
    const valor = parseInt(formCompleto.elements['c' + i].value) || 0;
    scoreCompleto += valor;
  }

  const totalFinal = window.scoreSF + scoreCompleto;

  const resultadoFinal = document.getElementById('resultado-final');
  resultadoFinal.innerHTML = `
    <p>Pontuação final: <strong>${totalFinal}</strong></p>
    <p>Paciente: <strong>${window.nomePaciente}</strong></p>
  `;

  gerarPDF(window.nomePaciente, totalFinal);
}

function gerarPDF(nome, pontuacao) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text(`Mini Avaliação Nutricional (MNA)`, 20, 20);
  doc.text(`Paciente: ${nome}`, 20, 40);
  doc.text(`Pontuação total: ${pontuacao}`, 20, 50);

  doc.save(`MNA_${nome}.pdf`);
}
