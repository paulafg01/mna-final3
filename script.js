



  function finalizar() {
  const nome = document.getElementById('nome').value;
  let pontosSF = 0;
  let pontosCompleto = 0;

  // Soma das perguntas do MNA-SF (p1 a p6)
  for (let i = 1; i <= 6; i++) {
    const valor = parseInt(document.querySelector(`select[name="p${i}"]`).value) || 0;
    pontosSF += valor;
  }

  // Verifica se precisa exibir o MNA completo
  if (pontosSF <= 11) {
    // Soma das perguntas do MNA completo (c1 a c12)
    for (let i = 1; i <= 12; i++) {
      const valor = parseInt(document.querySelector(`select[name="c${i}"]`)?.value) || 0;
      pontosCompleto += valor;
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
  const jsPDF = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text('Mini Avaliação Nutricional (MNA)', 20, 20);
  doc.text(`Paciente: ${nome}`, 20, 40);
  doc.text(`Pontuação total: ${total} pontos`, 20, 50);
  doc.text(`Classificação: ${classificacao}`, 20, 60);

  doc.save(`MNA-${nome}.pdf`);
}
