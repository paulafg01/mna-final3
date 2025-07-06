



 function finalizar() {
  const nome = document.getElementById('nome').value;
  let pontosSF = 0;
  let pontosCompleto = 0;

  // Soma dos pontos do MNA-SF (perguntas 1 a 6)
  for (let i = 1; i <= 6; i++) {
    const valor = parseInt(document.querySelector(`select[name=p${i}]`).value);
    pontosSF += valor;
  }

  // Verifica se precisa mostrar o MNA completo
  if (pontosSF <= 11) {
    for (let i = 7; i <= 18; i++) {
      const valor = parseInt(document.querySelector(`select[name=p${i}]`).value);
      pontosCompleto += valor;
    }
  }

  const total = pontosSF + pontosCompleto;

  // Exibir resultado na tela
  const resultadoDiv = document.getElementById('resultado-final');
  let classificacao = '';
  if (total >= 24) {
    classificacao = 'Estado nutricional adequado';
  } else if (total >= 17) {
    classificacao = 'Risco de desnutrição';
  } else {
    classificacao = 'Desnutrido';
  }

  resultadoDiv.innerHTML = `
    <h3>Resultado MNA Completo</h3>
    <p><strong>Paciente:</strong> ${nome}</p>
    <p><strong>Pontuação:</strong> ${total} pontos</p>
    <p><strong>Classificação:</strong> ${classificacao}</p>
  `;

  // Geração de PDF com jsPDF
  const doc = new jspdf.jsPDF();
  doc.setFontSize(14);
  doc.text(`Mini Avaliação Nutricional (MNA)`, 20, 20);
  doc.text(`Paciente: ${nome}`, 20, 40);
  doc.text(`Pontuação total: ${total}`, 20, 50);
  doc.text(`Classificação: ${classificacao}`, 20, 60);
  doc.save(`MNA-${nome}.pdf`);
}

    
