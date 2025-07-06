
function calcularPontuacao() {
    const nome = document.getElementById("nome").value || "Paciente";

    let p1 = parseInt(document.querySelector('select[name="p1"]').value);
    let p2 = parseInt(document.querySelector('select[name="p2"]').value);
    let p3 = parseInt(document.querySelector('select[name="p3"]').value);
    let p4 = parseInt(document.querySelector('select[name="p4"]').value);
    let p5 = parseInt(document.querySelector('select[name="p5"]').value);
    let p6 = parseInt(document.querySelector('select[name="p6"]').value);

    let soma = p1 + p2 + p3 + p4 + p5 + p6;

    let classificacao = "";
    if (soma >= 12) {
        classificacao = "Estado nutricional normal";
    } else if (soma >= 8) {
        classificacao = "Risco de desnutrição";
    } else {
        classificacao = "Desnutrido";
    }

    document.getElementById("resultado-sf").innerHTML =
        `<h3>Resultado MNA-SF</h3>
         <p><strong>Paciente:</strong> ${nome}</p>
         <p><strong>Pontuação:</strong> ${soma} pontos</p>
         <p><strong>Classificação:</strong> ${classificacao}</p>`;

    // Se escore ≤ 11, mostra o formulário completo
    if (soma <= 11) {
        document.getElementById("mna-completo").style.display = "block";
    } else {
        document.getElementById("mna-completo").style.display = "none";
    }
}

function finalizar() {
    const nome = document.getElementById("nome").value || "Paciente";

    // Somar pontos do MNA completo (perguntas c1 a c12 → valores de 0 a 2)
    let totalCompleto = 0;
    for (let i = 1; i <= 12; i++) {
        const select = document.querySelector(`select[name="c${i}"]`);
        if (select) {
            totalCompleto += parseInt(select.value);
        }
    }

    // Recalcular MNA-SF
    let p1 = parseInt(document.querySelector('select[name="p1"]').value);
    let p2 = parseInt(document.querySelector('select[name="p2"]').value);
    let p3 = parseInt(document.querySelector('select[name="p3"]').value);
    let p4 = parseInt(document.querySelector('select[name="p4"]').value);
    let p5 = parseInt(document.querySelector('select[name="p5"]').value);
    let p6 = parseInt(document.querySelector('select[name="p6"]').value);

    let somaSf = p1 + p2 + p3 + p4 + p5 + p6;
    let totalGeral = somaSf + totalCompleto;

    let resultadoFinal = "Classificação final: ";
    if (totalGeral >= 24) {
        resultadoFinal += "Estado nutricional normal";
    } else if (totalGeral >= 17) {
        resultadoFinal += "Risco de desnutrição";
    } else {
        resultadoFinal += "Desnutrido";
    }

    document.getElementById("resultado-final").innerHTML =
        `<h3>Resultado Final</h3>
         <p><strong>Paciente:</strong> ${nome}</p>
         <p><strong>Pontuação final:</strong> ${totalGeral} pontos</p>
         <p><strong>${resultadoFinal}</strong></p>`;

    gerarPDF(nome, totalGeral, resultadoFinal);
}

function gerarPDF(nome, pontuacao, classificacao) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("MNA - Mini Avaliação Nutricional", 20, 20);
    doc.setFontSize(12);
    doc.text(`Paciente: ${nome}`, 20, 40);
    doc.text(`Pontuação total: ${pontuacao} pontos`, 20, 50);
    doc.text(`${classificacao}`, 20, 60);
    doc.save(`MNA_${nome}.pdf`);
}
