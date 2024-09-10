let dolar = 5.6 
let usdInput = document.querySelector("#usd")
let brlInput = document.querySelector("#brl")

// Função para pegar a cotação do dólar em tempo real
async function getDollarRate() {
    try {
        let response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL")
        let data = await response.json()
        dolar = parseFloat(data.USDBRL.bid)
        console.log(`Cotação do dólar atual: ${dolar}`)
    } catch (error) {
        console.error("Erro ao buscar a cotação do dólar:", error)
    }
}


getDollarRate()


usdInput.addEventListener("keyup", () => {
    usdInput.value = validateInput(usdInput.value) 
    let usdValue = fixValue(usdInput.value)
    let brlValue = usdValue * dolar
    brlInput.value = formatCurrency(brlValue)
})

// Evento para quando o usuário digita no campo BRL
brlInput.addEventListener("keyup", () => {
    brlInput.value = validateInput(brlInput.value) 
    let brlValue = fixValue(brlInput.value)
    let usdValue = brlValue / dolar
    usdInput.value = formatCurrency(usdValue)
})

// Função para validar a entrada e permitir apenas números e ponto decimal
function validateInput(value) {
    
    return value.replace(/[^0-9.,]/g, "")
}

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

    
    if (isNaN(floatValue)) {
        floatValue = 0
    }
    return floatValue
}
