const formulario = document.getElementById("doppler-form");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const velocidadeObservador = obterNumero("velocidade-observador");
    const velocidadeFonte = obterNumero("velocidade-fonte");
    const velocidadeSom = obterNumero("velocidade-som");
    const frequenciaFonte = obterNumero("frequencia-fonte");

    const valores = [
        velocidadeObservador,
        velocidadeFonte,
        velocidadeSom,
        frequenciaFonte
    ];

    if (!valores.every(Number.isFinite)) {
        mostrarErro("Preencha todos os campos com números válidos.");
        return;
    }

    if (velocidadeSom <= 0 || frequenciaFonte <= 0) {
        mostrarErro(
            "A velocidade do som e a frequência da fonte devem ser maiores que zero."
        );
        return;
    }

    const denominador = velocidadeSom - velocidadeFonte;

    if (denominador <= 0) {
        mostrarErro(
            "A velocidade da fonte deve ser menor que a velocidade do som."
        );
        return;
    }

    const frequenciaPercebida =
        frequenciaFonte *
        ((velocidadeSom + velocidadeObservador) / denominador);

    if (frequenciaPercebida <= 0) {
        mostrarErro(
            "A combinação das velocidades não gera uma frequência física válida."
        );
        return;
    }

    resultado.classList.remove("erro");
    resultado.innerHTML = `
        Frequência percebida pelo observador:
        <strong>${formatarNumero(frequenciaPercebida)} Hz</strong>
    `;
});

function obterNumero(id) {
    const valor = document.getElementById(id).value;
    return Number(valor);
}

function mostrarErro(mensagem) {
    resultado.classList.add("erro");
    resultado.textContent = mensagem;
}

function formatarNumero(numero) {
    return numero.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
