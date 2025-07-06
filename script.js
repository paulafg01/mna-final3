
function calcularPontuacao() {
    const nome = document.getElementById("nome").value.trim();
    if (!nome) {
        alert("Por favor, insira o nome do paciente.");
        return;
    }

    let pontuacaoSF = 0;
    for (let i = 1; i <= 6; i++) {
        const valor = document.querySelector(`select[name=p${i}]`).value;
        pontuacaoSF += parseInt(valor);
    }

    let classificacao = "";
    if (pontuacaoSF >= 12) {
        classificacao = "Estado nutricional normal";
    } else if (pontuacaoSF >= 8) {
        classificacao = "Risco de desnutrição";
    } else {
        classificacao = "Desnutrido";
    }

    document.getElementById("resultado-sf").innerHTML = `
        <h3>Resultado MNA-SF</h3>
        <p><strong>Paciente:</strong> ${nome}</p>
        <p><strong>Pontuação:</strong> ${pontuacaoSF} pontos</p>
        <p><strong>Classificação:</strong> ${classificacao}</p>
    `;

    if (pontuacaoSF <= 11) {
        document.getElementById("mna-completo").style.display = "block";
        window.scrollTo(0, document.body.scrollHeight);
    } else {
        document.getElementById("mna-completo").style.display = "none";
    }
}

function finalizar() {
    const nome = document.getElementById("nome").value.trim();
    if (!nome) {
        alert("Por favor, insira o nome do paciente.");
        return;
    }

    let pontuacaoTotal = 0;

    // Soma MNA-SF
    for (let i = 1; i <= 6; i++) {
        pontuacaoTotal += parseInt(document.querySelector(`select[name=p${i}]`).value);
    }

    // Soma perguntas do MNA completo
    for (let i = 1; i <= 12; i++) {
        const valor = document.querySelector(`select[name=c${i}]`);
        if (valor) {
            pontuacaoTotal += parseInt(valor.value);
        }
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Mini Avaliação Nutricional (MNA)`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Paciente: ${nome}`, 20, 35);
    doc.text(`Pontuação Total: ${pontuacaoTotal}`, 20, 45);
    doc.save(`MNA_${nome}.pdf`);

    document.getElementById("resultado-final").innerHTML = `
        <h3>PDF gerado!</h3>
        <p><strong>Paciente:</strong> ${nome}</p>
        <p><strong>Pontuação total:</strong> ${pontuacaoTotal} pontos</p>
    `;
}
