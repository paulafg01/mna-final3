



 
    function finalizar() {
  const nome = document.getElementById('nome').value;
  let pontosSF = 0;
  let pontosCompleto = 0;

  // Somar os pontos do MNA-SF (perguntas p1 a p6)
  for (let i = 1; i <= 6; i++) {
    const valor = parseInt(document.querySelector(`select[name="p${i}"]`).value);
    pontosSF += valor;
  }

  // Verifica se precisa mostrar o MNA completo
  if (pontosSF <= 11) {
    for (let i = 1; i <= 12; i++) {
      const valor = parseInt(document.querySelector(`select[name="c${i}"]`)?.value || 0);
      pontosCompleto += valor;
    }
  }

  const total = pontosSF + pontosCompleto;

  // Exibir resultado na tela
  const resultadoDiv = document.getElementById('resultado-final');
  resultadoDiv.innerHTML = `
    <h3>Resultado Final</h3>
    <p><strong>Paciente:</strong> ${nome}</p>
    <p><strong>Pontuação Total:</strong> ${total} pontos</p>
  `;

  // Gerar PDF
  gerarPDF(nome, total);
}

function gerarPDF(nome, total) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text('Mini Avaliação Nutricional (MNA)', 20, 20);
  doc.text(`Paciente: ${nome}`, 20, 40);
  doc.text(`Pontuação total: ${total} pontos`, 20, 50);

  doc.save(`MNA-${nome}.pdf`);
}
