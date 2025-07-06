document.getElementById('mna-sf').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  let scoreSF = 0;

  for (let i = 1; i <= 6; i++) {
    scoreSF += parseInt(form[`p${i}`].value, 10);
  }

  const nome = document.getElementById('nome').value;
  const texto = `<p><b>Paciente:</b> ${nome}</p><p>Pontuação MNA-SF: ${scoreSF}</p>`;
  document.getElementById('resultado-sf').innerHTML = texto;

  if (scoreSF <= 11) {
    document.getElementById('mna-completo').style.display = 'block';
  } else {
    gerarPDF(nome, scoreSF, null);
  }
});

function finalizar() {
  const nome = document.getElementById('nome').value;
  let scoreSF = 0;

  for (let i = 1; i <= 6; i++) {
    scoreSF += parseInt(document.querySelector(`[name=p${i}]`).value, 10);
  }

  let scoreC = 0;
  scoreC += parseInt(document.querySelector('[name="c1"]').value, 10);
  scoreC += parseInt(document.querySelector('[name="c2"]').value, 10);

  gerarPDF(nome, scoreSF, scoreC);
}

function gerarPDF(nome, scoreSF, scoreC) {
  const total = scoreC === null ? scoreSF : scoreSF + scoreC;
  let texto = `<p><b>Paciente:</b> ${nome}</p><p>Pontuação MNA-SF: ${scoreSF}</p>`;

  if (scoreC !== null) {
    texto += `<p>Pontuação MNA Completo: ${scoreC}</p><p>Pontuação Total: ${total}</p>`;
  }

  const blob = new Blob([texto], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `MNA-${nome}.pdf`;
  link.click();
}
