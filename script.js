



 
 const resultadoDiv = document.getElementById('resultado-final');
  resultadoDiv.innerHTML = `
    <h3>Resultado Final</h3>
    <p><strong>Paciente:</strong> ${nome}</p>
    <p><strong>Pontuação Total:</strong> ${total} pontos</p>
  `;

  gerarPDF(nome, total); // Chama a função para gerar o PDF
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
 
    
