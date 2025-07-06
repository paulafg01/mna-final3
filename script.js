{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 HelveticaNeue;\f1\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0\cname textColor;\cssrgb\c0\c0\c0;}
\pard\tx560\tx1120\tx1680\tx2240\tx2800\tx3360\tx3920\tx4480\tx5040\tx5600\tx6160\tx6720\pardirnatural\partightenfactor0

\f0\fs24 \cf2 De: Paula <paulafguedes@yahoo.com.br>\
Assunto: 3\
Data: 5 de julho de 2025 \'e0s 22:55:23 BRT\
Para: Paula <paulafguedes@yahoo.com.br>\
\pard\tx560\tx1120\tx1680\tx2240\tx2800\tx3360\tx3920\tx4480\tx5040\tx5600\tx6160\tx6720\pardirnatural\partightenfactor0

\f1 \cf2 \
\pard\pardeftab720\partightenfactor0
\cf3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec3 // MNA App Script\
function calcularSF() \{\
\'a0// Soma os valores do formul\'e1rio curto (A-F)\
\'a0let s = 0;\
\'a0s += parseInt(document.getElementById('qA').value);\
\'a0s += parseInt(document.getElementById('qB').value);\
\'a0s += parseInt(document.getElementById('qC').value);\
\'a0s += parseInt(document.getElementById('qD').value);\
\'a0s += parseInt(document.getElementById('qE').value);\
\'a0s += parseInt(document.getElementById('qF').value);\
\'a0// Classifica\'e7\'e3o do MNA-SF\
\'a0let classificacaoSF;\
\'a0if (s >= 12) \{\
\'a0\'a0\'a0classificacaoSF = 'Adequado';\
\'a0\} else if (s >= 8) \{\
\'a0\'a0\'a0classificacaoSF = 'Risco de desnutri\'e7\'e3o';\
\'a0\} else \{\
\'a0\'a0\'a0classificacaoSF = 'Desnutri\'e7\'e3o estabelecida';\
\'a0\}\
\'a0let nome = document.getElementById('nome').value || 'Paciente';\
\'a0// Mostra resultado da triagem\
\'a0let resultText = 'MNA-SF: ' + s + ' / 14 \'97 ' + classificacaoSF;\
\'a0if (s <= 11) \{\
\'a0\'a0\'a0resultText += '\\nPor favor, prossiga para a avalia\'e7\'e3o completa.';\
\'a0\'a0\'a0document.getElementById('fullSection').style.display = 'block';\
\'a0\} else \{\
\'a0\'a0\'a0document.getElementById('fullSection').style.display = 'none';\
\'a0\}\
\'a0document.getElementById('resultadoSF').textContent = resultText;\
\'a0// Limpa resultado final anterior, se houver\
\'a0document.getElementById('resultadoFinal').textContent = '';\
\'a0// Se n\'e3o precisar do MNA completo (estado adequado), gera PDF diretamente\
\'a0if (s >= 12) \{\
\'a0\'a0\'a0gerarPDF(nome, s.toString(), classificacaoSF);\
\'a0\}\
\}\
\
function calcularFull() \{\
\'a0// Recalcula parte da triagem A-F para garantir valores atualizados\
\'a0let s = 0;\
\'a0s += parseInt(document.getElementById('qA').value);\
\'a0s += parseInt(document.getElementById('qB').value);\
\'a0s += parseInt(document.getElementById('qC').value);\
\'a0s += parseInt(document.getElementById('qD').value);\
\'a0s += parseInt(document.getElementById('qE').value);\
\'a0s += parseInt(document.getElementById('qF').value);\
\'a0// Soma as quest\'f5es adicionais G-R\
\'a0let t = 0;\
\'a0t += parseInt(document.getElementById('qG').value);\
\'a0t += parseInt(document.getElementById('qH').value);\
\'a0t += parseInt(document.getElementById('qI').value);\
\'a0t += parseInt(document.getElementById('qJ').value);\
\'a0// Quest\'e3o K: c\'e1lculo combinado das 3 subperguntas\
\'a0let kCount = 0;\
\'a0if (document.getElementById('qK1').checked) kCount++;\
\'a0if (document.getElementById('qK2').checked) kCount++;\
\'a0if (document.getElementById('qK3').checked) kCount++;\
\'a0let kScore;\
\'a0if (kCount <= 1) \{\
\'a0\'a0\'a0kScore = 0;\
\'a0\} else if (kCount == 2) \{\
\'a0\'a0\'a0kScore = 0.5;\
\'a0\} else \{\
\'a0\'a0\'a0kScore = 1;\
\'a0\}\
\'a0t += kScore;\
\'a0t += parseFloat(document.getElementById('qL').value);\
\'a0t += parseFloat(document.getElementById('qM').value);\
\'a0t += parseInt(document.getElementById('qN').value);\
\'a0t += parseInt(document.getElementById('qO').value);\
\'a0t += parseFloat(document.getElementById('qP').value);\
\'a0t += parseFloat(document.getElementById('qQ').value);\
\'a0t += parseInt(document.getElementById('qR').value);\
\'a0// Escore total = triagem + avalia\'e7\'e3o completa\
\'a0let totalScore = s + t;\
\'a0// Classifica\'e7\'e3o final baseada no escore total\
\'a0let classificacaoFinal;\
\'a0if (totalScore >= 24) \{\
\'a0\'a0\'a0classificacaoFinal = 'Adequado';\
\'a0\} else if (totalScore >= 17) \{\
\'a0\'a0\'a0classificacaoFinal = 'Risco de desnutri\'e7\'e3o';\
\'a0\} else \{\
\'a0\'a0\'a0classificacaoFinal = 'Desnutri\'e7\'e3o estabelecida';\
\'a0\}\
\'a0// Formata o escore (inclui .5 se necess\'e1rio)\
\'a0let scoreText = Number.isInteger(totalScore) ? totalScore.toString() : totalScore.toFixed(1);\
\'a0let nome = document.getElementById('nome').value || 'Paciente';\
\'a0let resultadoText = nome + ' \'97 Escore Total: ' + scoreText + ' / 30 \'97 ' + classificacaoFinal;\
\'a0document.getElementById('resultadoFinal').textContent = resultadoText;\
\'a0// Gera PDF com o resultado final\
\'a0gerarPDF(nome, scoreText, classificacaoFinal);\
\}\
\
function gerarPDF(nome, score, classificacao) \{\
\'a0const \{ jsPDF \} = window.jspdf;\
\'a0const doc = new jsPDF();\
\'a0doc.setFontSize(12);\
\'a0doc.text('Nome: ' + (nome || 'N\'e3o informado'), 20, 20);\
\'a0if (parseFloat(score) <= 14) \{\
\'a0\'a0\'a0doc.text('Escore MNA-SF: ' + score + ' / 14', 20, 30);\
\'a0\} else \{\
\'a0\'a0\'a0doc.text('Escore Total MNA: ' + score + ' / 30', 20, 30);\
\'a0\}\
\'a0doc.text('Classifica\'e7\'e3o: ' + classificacao, 20, 40);\
\'a0doc.save('MNA-' + (nome || 'resultado') + '.pdf');\
\}\
\
// Associa os bot\'f5es \'e0s fun\'e7\'f5es de c\'e1lculo\
document.getElementById('calcSF').addEventListener('click', calcularSF);\
document.getElementById('calcFull').addEventListener('click', calcularFull);\
Enviado do meu iPad\
}