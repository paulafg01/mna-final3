



 function finalizar() {
  const nome = document.getElementById('nome').value;
  let pontosSF = 0;
  let pontosCompleto = 0;

  // Somar os pontos do MNA-SF (p1 a p6)
  for (let i = 1; i <= 6; i++) {
    const valor = parseInt(document.querySelector(`[name="p${i}"]`).value);
    pontosSF += valor;
  }

  // Exibir ou ocultar MNA completo com base no SF
  const blocoCompleto = document.getElementById('completo');
  if (pontosSF <= 11) {
    blocoCompleto.style.display = 'block';

    // Somar os pontos do MNA completo (p7 a p18)
    for (let i = 7; i <= 18; i++) {
      const valor = parseInt(document.querySelector(`[name="p${i}"]`).value || 0);
      pontosCompleto += valor;
    }
  } else {
    blocoCompleto.style.display = 'none';
  }

  const total = pontosSF + pontosCompleto;

  let classificacao = '';
  if (total >= 24) {
    classificacao = 'Estado nutricional adequado';
  } else if (total >= 17) {
    classificacao = 'Risco de desnutrição';
  } else {
    classificacao = 'Desnutrição';
  }

  // Exibir resultado na tela
  const resultadoDiv = document.getElementById('resultado-final');
  resultadoDiv.innerHTML = `<h3>Resultado Final:</h3>
    <p><strong>Paciente:</strong> ${nome}</p>
    <p><strong>Pontuação Total:</strong> ${total}</p>
    <p><strong>Classificação:</strong> ${classificacao}</p>`;

  // Gerar PDF com jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(12);
  doc.text(`Mini Avaliação Nutricional (MNA)`, 10, 20);
  doc.text(`Nome do paciente: ${nome}`, 10, 30);
  doc.text(`Pontuação total: ${total}`, 10, 40);
  doc.text(`Classificação: ${classificacao}`, 10, 50);

  doc.save(`MNA-${nome}.pdf`);
}
