document.getElementsByClassName('input bill')[0].focus()
const selectBtn = document.getElementsByClassName('percent')
let percent = 0
for (let i = 0; i < selectBtn.length; i++) {
    selectBtn[i].addEventListener('click', function (event) {
        deSelected()
        percent = (event.target.innerText.toLowerCase().replace('%', '')) / 100;
        event.target.classList.add('selected')
        document.getElementById('custom').value = "";
        const bill = document.getElementsByClassName('input bill')[0].value
        const people = document.getElementsByClassName('input people')[0].value
        calcTip(bill, percent, people)
    })
}

document.getElementsByClassName('input bill')[0].addEventListener('change', (e) => {
    fillBill(e)
})
document.getElementsByClassName('input bill')[0].addEventListener('keypress', (e) => {
    fillBill(e)
})
document.getElementsByClassName('input people')[0].addEventListener('change', (e) => {
    fillPeople(e)
})
document.getElementsByClassName('input people')[0].addEventListener('keyup', (e) => {
    fillPeople(e)
})

document.getElementById('custom').addEventListener('change', () => {
    deSelected()
    if (document.getElementById('custom').value < 0) document.getElementById('custom').value = ''
    percent = document.getElementById('custom').value / 100
    const bill = document.getElementsByClassName('input bill')[0].value
    const people = document.getElementsByClassName('input people')[0].value
    calcTip(bill, percent, people)
})
function deSelected() {
    for (let l = 0; l < selectBtn.length; l++) { selectBtn[l].classList.remove('selected'); }
}
function fillPeople(e) {
    if (e.target.value < 1) e.target.value = 1
    const people = e.target.value
    const bill = document.getElementsByClassName('input bill')[0].value
    calcTip(bill, percent, people)
}
function fillBill(e) {
    if (e.target.value <= 0) e.target.value = ''
    const bill = e.target.value
    const people = document.getElementsByClassName('input people')[0].value
    calcTip(bill, percent, people)
}
document.getElementsByClassName('reset')[0].addEventListener('click', () => { resetFields() });
function resetFields() {
    deSelected()
    document.getElementById('custom').value = ''
    percent = 0
    document.getElementsByClassName('input people')[0].value = 1
    document.getElementsByClassName('input bill')[0].value = ""
    document.getElementById('tipPerson').innerHTML = 'R$0,00'
    document.getElementById('totalPerson').innerHTML = 'R$0,00'
}
function calcTip(bill, tip, people) {
    if (isNaN(tip)) tip = 0;
    if (isNaN(bill)) bill = 0;
    const total = bill * (tip + 1)
    const perPerson = total / people
    const tipPerson = (tip * bill) / people
    document.getElementById('tipPerson').innerHTML = 'R$' + tipPerson.toFixed(2).replace('.', ',')
    document.getElementById('totalPerson').innerHTML = 'R$' + perPerson.toFixed(2).replace('.', ',')
    return total, perPerson
}

// console.log(new Intl.NumberFormat('pt-BR',  {
//   style: 'currency',
//   currency: 'BRL',
// }).format(number))