
const form = document.querySelector('.form')
const counter = document.querySelector('.form__counter')
const coments = document.querySelector('.container_coments')

let currentDay = new Date()

let errorSubmit = Symbol('error')
// Отправка формы по нажатию
document.addEventListener('keypress', listenEnterButton)

function listenEnterButton(event) {
    if (event.key === 'Enter') {
        const event = new Event('customSubmit')
        form.dispatchEvent(event)
    }
}

//Валидация
form.addEventListener('focusout', (event) => {
    if (event.target.value === '') {
        event.target.style.borderColor = 'red'
        event.target.errorSubmit = true
    }
})

form.addEventListener('focusin', (event) => {
    if (event.target.innerHTML === '') {
        event.target.style.borderColor = 'white'
        event.target.errorSubmit = false
    }
})

// Подсчет символов авторесайз
form.comment.addEventListener('input', countSymbol)

function countSymbol() {
    counter.innerHTML = `${form.comment.value.split('').length}/255`
    form.comment.style.height = Math.max(42, this.scrollHeight) + 'px'
    if (form.comment.value.split('').length >= 255) {
        counter.style.color = 'red'
        errorSubmit = true
    }
    else {
        counter.style.color = 'white'
        errorSubmit = true
    }
}

countSymbol()

form.comment.setAttribute("style", "height:" + (form.comment.scrollHeight) + "px;overflow-y:hidden;");

// Установка даты
(function () {
    form.date.value = currentDay.toISOString().substr(0, 10);
    form.date.max = currentDay.toISOString().substr(0, 10);
})()

// Отправка самой формы
form.addEventListener('submit', sendForm)
form.addEventListener('customSubmit', sendForm)

function sendForm(event) {
    event.preventDefault()

    //Валидация
    let fields = [form.name, form.surename, form.comment]
    fields.forEach((elem)=>{
        elem.focus()
        elem.blur() 
    })
    if (fields.every((elem)=>elem.errorSubmit != true)){
    const comentHTMLtemplate = `
    <div class="coment">
                <div class="coment__header_container">
                    <h3 class="coment__name">${formatName(form.name.value)} ${formatName(form.surename.value)}</h1>
                    <p class="coment__date">${setDateAndTime()}</p>
                </div>
                <div class="coment__mesage_container">
                    <p class="coment__message">${form.comment.value}</p>
                </div>
                <img src="src/like.svg" alt="" class="coment__like">
            </div>
    `
    coments.insertAdjacentHTML('afterbegin', comentHTMLtemplate)
}
}

// Форматирование имени
function formatName(str) {
    try{
        return str.replace(str[0], str[0].toUpperCase())
    }
    catch{
        return str
    }
}

// Форматирование даты
function setDateAndTime() {
    const inputValue = new Date(form.date.value)
    const isYesterday = currentDay.getDate() - inputValue.getDate()
    let dateCalc;
    switch (isYesterday) {
        case 0:
            dateCalc = 'Сегодня'
            break
        case 1:
            dateCalc = 'Вчера'
            break
        default:
            dateCalc = `${inputValue.getDate().toString().padStart(2, '0')}.${inputValue.getMonth().toString().padStart(2, '0')}.${inputValue.getFullYear()}`
    }
    dateCalc += ` ${currentDay.getHours().toString().padStart(2, '0')}:${currentDay.getMinutes().toString().padStart(2, '0')}`
    return dateCalc
}

//Лайк
document.querySelector('.container_coments').addEventListener('click', (event) => {
    if (event.target.classList.contains('coment__like')) {
        event.target.src = event.target.src.includes('src/like.svg') ? 'src/liked.svg' : 'src/like.svg'
    }
})

// Обработка что пока мы в textarea не смогли отправить форму по enter
form.comment.addEventListener('focus', () => {
    document.removeEventListener('keypress', listenEnterButton)
})

form.comment.addEventListener('blur', () => {
    document.addEventListener('keypress', listenEnterButton)
})