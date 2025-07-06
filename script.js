


function calcular() {
  const nome = document.getElementById('nome').value;
  let pontos = 0;

  for (let i = 1; i <= 6; i++) {
    const valor = parseInt(document.querySelector(`select[name="p${i}"]`).value);
    pontos += valor;
  }

  let classificacao = '';
  if (pontos >= 12) {
    classificacao = 'Estado nutricional adequado';
  } else if (pontos > 8) {
    classificacao = 'Risco de desnutrição';
  } else {
    classificacao = 'Desnutrido';
  }

  let resultadoDiv = document.getElementById('resultado-sf');
  resultadoDiv.innerHTML = `
    <h3>Resultado MNA-SF</h3>
    <p><strong>Paciente:</strong> ${nome}</p>
    <p><strong>Pontuação:</strong> ${pontos} pontos</p>
    <p><strong>Classificação:</strong> ${classificacao}</p>
  `;

  // Mostra o MNA completo se a pontuação for 11 ou menos
  if (pontos <= 11) {
    document.getElementById('mna-completo').style.display = 'block';
  } else {
    document.getElementById('mna-completo').style.display = 'none';
    gerarPDF(nome, pontos, classificacao); // Gera PDF direto se não precisar do MNA completo
  }
}

function finalizar() {
  const nome = document.getElementById('nome').value;

  let pontosSF = 0;
  let pontosCompleto = 0;

  for (let i = 1; i <= 6; i++) {
    pontosSF += parseInt(document.querySelector(`select[name="p${i}"]`).value);
  }

  for (let i = 1; i <= 12; i++) {
    pontosCompleto += parseInt(document.querySelector(`select[name="c${i}"]`).value);
  }

  const total = pontosSF + pontosCompleto;

  let classificacao = '';
  if (total >= 24) {
    classificacao = 'Estado nutricional adequado';
  } else if (total >= 17) {
    classificacao = 'Risco de desnutrição';
  } else {
    classificacao = 'Desnutrido';
  }

  const resultadoFinal = document.getElementById('resultado-final');
  resultadoFinal.innerHTML = `
    <h3>Resultado Final</h3>
    <p><strong>Paciente:</strong> ${nome}</p>
    <p><strong>Pontuação Total:</strong> ${total} pontos</p>
    <p><strong>Classificação:</strong> ${classificacao}</p>
  `;

  gerarPDF(nome, total, classificacao);
}

function gerarPDF(nome, total, classificacao) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text('Mini Avaliação Nutricional (MNA)', 20, 20);
  doc.text(`Paciente: ${nome}`, 20, 40);
  doc.text(`Pontuação total: ${total} pontos`, 20, 50);
  doc.text(`Classificação: ${classificacao}`, 20, 60);

  doc.save(`MNA-${nome}.pdf`);
}
