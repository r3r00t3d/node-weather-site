console.log('Client side javascript is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = ''
    messageTwo.textContent = ''
    const location = search.value 
    const url = 'http://localhost:3000/weather?address=' + location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})