const newQuote = document.getElementById("new-quote")
const quoteText = document.getElementById("text")
const author = document.getElementById("author")

const randomIndex = len => Math.round(Math.random() * len)

const pickColor = () => {
    colors = ["#1abc9c", "#f1c40f", "#e74c3c", "#f39c12", "#2c3e50", "#9b59b6", "#2980b9", "#7f8c8d", "#22a6b3"]

    return colors[randomIndex(colors.length - 1)]
}


const fetchQuote = async () => {
    const res = await fetch("https://type.fit/api/quotes")
    const quotes = await res.json()
    return quotes[randomIndex(1640)]
}

const changeColor = color => {
    document.querySelector("body").style.color = color;
    document.querySelector("body").style.backgroundColor = color;
    document.querySelectorAll('a').forEach(item => item.style.backgroundColor = color)
}


const changeQuote = async () => {
    const quote = await fetchQuote()
    const color = pickColor()


    quoteText.textContent = quote.text
    author.textContent = "-" + quote.author
    changeColor(color)
}


newQuote.addEventListener("click", changeQuote)

document.addEventListener("load", changeQuote)