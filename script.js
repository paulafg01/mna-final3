
 function finalizar() {
  const nome = document.getElementById('nome').value;
  let pontosSF = 0;
  let pontosCompleto = 0;

  // Soma MNA-SF
  for (let i = 1; i <= 6; i++) {
    pontosSF += parseInt(document.querySelector(`select[name="p${i}"]`).value);
  }

  // Se pontuação SF for menor ou igual a 11, soma o restante
  if (pontosSF <= 11) {
    for (let i = 1; i <= 12; i++) {
      pontosCompleto += parseInt(document.querySelector(`select[name="c${i}"]`).value);
    }
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

  let resultadoFinal = document.getElementById('resultado-final');
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
