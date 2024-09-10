let dolar = 5.6

let usdInput = document.querySelector("#usd")
let brlInput = document.querySelector("#brl")

// Evento para quando o usuário digita no campo USD
usdInput.addEventListener("keyup", () => {
    let usdValue = fixValue(usdInput.value)
    let brlValue = usdValue * dolar
    brlInput.value = formatCurrency(brlValue)
})

// Evento para quando o usuário digita no campo BRL
brlInput.addEventListener("keyup", () => {
    let brlValue = fixValue(brlInput.value)
    let usdValue = brlValue / dolar
    usdInput.value = formatCurrency(usdValue)
})

// Função para formatar o valor monetário corretamente
function formatCurrency(value) {
    let fixedValue = parseFloat(value).toFixed(2)
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }
    let formatter = new Intl.NumberFormat("pt-BR", options)
    return formatter.format(fixedValue)
}

// Função para corrigir o valor digitado e convertê-lo em número
function fixValue(value) {
    let fixedValue = value.replace(",", ".")
    let floatValue = parseFloat(fixedValue)

    // Verifica se o valor é NaN e ajusta para 0
    if (isNaN(floatValue)) {
        floatValue = 0
    }
    return floatValue
}

// Função para realizar a conversão
function convert(type) {
    if (type == "usd-to-brl") {
        let usdValue = fixValue(usdInput.value)
        let brlValue = usdValue * dolar
        brlInput.value = formatCurrency(brlValue)
    }

    if (type == "brl-to-usd") {
        let brlValue = fixValue(brlInput.value)
        let usdValue = brlValue / dolar
        usdInput.value = formatCurrency(usdValue)
    }
}
