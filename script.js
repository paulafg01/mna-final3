


vfunction calcularMNASF() {
  let total = 0;

  for (let i = 1; i <= 6; i++) {
    const resposta = document.querySelector(`input[name="pergunta${i}"]:checked`);
    if (resposta) {
      total += parseInt(resposta.value);
    }
  }

  const nome = document.getElementById("nome").value || "Paciente";

  if (total <= 11) {
    document.getElementById("mna-sf").style.display = "none";
    document.getElementById("mna-completo").style.display = "block";
  } else {
    document.getElementById("resultado-final").innerText =
      `Resultado: ${total} pontos - Avaliação concluída para ${nome}.`;
    gerarPDF(nome, total);
  }
}

function finalizar() {
  let total = 0;

  // Soma MNA-SF
  for (let i = 1; i <= 6; i++) {
    const resposta = document.querySelector(`input[name="pergunta${i}"]:checked`);
    if (resposta) {
      total += parseInt(resposta.value);
    }
  }

  // Soma MNA completo
  for (let i = 7; i <= 18; i++) {
    const resposta = document.querySelector(`input[name="pergunta${i}"]:checked`);
    if (resposta) {
      total += parseInt(resposta.value);
    }
  }

  const nome = document.getElementById("nome").value || "Paciente";
  document.getElementById("resultado-final").innerText =
    `Resultado final: ${total} pontos - Avaliação completa para ${nome}.`;
  gerarPDF(nome, total);
}

function gerarPDF(nome, total) {
  const doc = new window.jspdf.jsPDF();
  doc.setFontSize(14);
  doc.text(`Mini Nutritional Assessment (MNA)`, 20, 20);
  doc.text(`Nome do paciente: ${nome}`, 20, 40);
  doc.text(`Pontuação final: ${total} pontos`, 20, 50);
  doc.text(`Nutricionista Paula Guedes`, 20, 70);
  doc.save(`MNA_${nome.replace(/\s+/g, "_")}.pdf`);
}
  
