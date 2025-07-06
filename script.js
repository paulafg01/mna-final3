

function calcular() {
  const nome = document.getElementById('nome').value;
  let pontosSF = 0;

  for (let i = 1; i <= 6; i++) {
    const valor = parseInt(document.querySelector(`select[name="p${i}"]`).value);
    pontosSF += valor;
  }

  let classificacao = '';
  if (pontosSF >= 12) {
    classificacao = 'Estado nutricional adequado';
  } else if (pontosSF > 8) {
    classificacao = 'Risco de desnutrição';
  } else {
    classificacao = 'Desnutrido';
  }

  const resultadoDiv = document.getElementById('resultado-final');
  resultadoDiv.innerHTML = `
    <h3>Resultado MNA-SF</h3>
    <p><strong>Paciente:</strong> ${nome}</p>
    <p><strong>Pontuação:</strong> ${pontosSF} pontos</p>
    <p><strong>Classificação:</strong> ${classificacao}</p>
  `;

  if (pontosSF <= 11) {
    document.getElementById('mna-completo').style.display = 'block';
  } else {
    document.getElementById('mna-completo').style.display = 'none';
  }
}

function finalizar() {
  const nome = document.getElementById('nome').value;
  let pontosSF = 0;
  let pontosCompleto = 0;

  // Recalcula pontos do MNA-SF
  for (let i = 1; i <= 6; i++) {
    pontosSF += parseInt(document.querySelector(`select[name="p${i}"]`).value);
  }

  // Soma pontos do MNA completo
  for (let i = 1; i <= 12; i++) {
    pontosCompleto += parseInt(document.querySelector(`select[name="c${i}"]`).value);
  }

  const total = pontosSF + pontosCompleto;

  const resultadoFinal = document.getElementById('resultado-final');
  resultadoFinal.innerHTML = `
    <h3>Resultado Final</h3>
    <p><strong>Paciente:</strong> ${nome}</p>
    <p><strong>Pontuação Total:</strong> ${total} pontos</p>
  `;

  gerarPDF(nome, total);
}

function gerarPDF(nome, total) {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Mini Avaliação Nutricional (MNA)', 20, 20);
  doc.text(`Paciente: ${nome}`, 20, 40);
  doc.text(`Pontuação total: ${total} pontos`, 20, 50);
  doc.save(`MNA-${nome}.pdf`);
}
