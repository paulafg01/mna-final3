
window.onload = () => {
  // Garante que o jsPDF está disponível no escopo global
  window.jsPDF = window.jspdf.jsPDF;
};

function finalizar() {
  const nome = document.getElementById('nome').value;
  let pontosSF = 0;
  let pontosCompleto = 0;

  // Soma pontos do MNA-SF
  for (let i = 1; i <= 6; i++) {
    const val = document.querySelector(`select[name="p${i}"]`).value;
    pontosSF += parseInt(val) || 0;
  }

  // Soma MNA completo se necessário
  if (pontosSF <= 11) {
    for (let i = 1; i <= 12; i++) {
      const val = document.querySelector(`select[name="c${i}"]`).value;
      pontosCompleto += parseInt(val) || 0;
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
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text('Mini Avaliação Nutricional (MNA)', 20, 20);
  doc.text(`Paciente: ${nome}`, 20, 40);
  doc.text(`Pontuação total: ${total} pontos`, 20, 50);
  doc.text(`Classificação: ${classificacao}`, 20, 60);

  doc.save(`MNA-${nome}.pdf`);
}
   
