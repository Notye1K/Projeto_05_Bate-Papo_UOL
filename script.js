let nameUser = ''
function testName(){
    nameUser = document.querySelector('.screenOfName input').value
    let promisse = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants',{nameUser})
    promisse.then(vanishScreenOfName)
    promisse.catch(erro)
    console.log('carregando')
}
function vanishScreenOfName(answer){
    let screen = document.querySelector('.screenOfName')
    screen.classList.add('vanishDisplay')
    load()
    setInterval(load,3000)
    setInterval(keepingPage,5000)
}
function keepingPage(){
    axios.post('https://mock-api.driven.com.br/api/v4/uol/status',{nameUser})
}
function erro(answer){
    document.querySelector('.screenOfName input').placeholder= 'Digite outro nome'
}


function load(){
    const promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    promisse.then(loadMessages)
}
function loadMessages (answer) {
    // console.log(answer.data)
    // console.log('aaaaaaaaaaa')
    // console.log(answer[0])
    // console.log('bbbbbbbbbbbbb')
    // console.log(answer.data[0].text)
    
    let main = document.querySelector('main')
    main.innerHTML = ""
    for (let i = 0; i<answer.data.length; i++) {
        if(answer.data[i].type=='status'){
            main.innerHTML += `
            <div class="message movimentMessage">
                <span class="time">${answer.data[i].time}</span>
                <span class="text"><strong>${answer.data[i].from}</strong> ${answer.data[i].text}</span>
            </div>`
        }
        else if(answer.data[i].type == 'message'){
            main.innerHTML += `
            <div class="message normalMessage">
                <span class="time">${answer.data[i].time}</span>
                <span class="text"><strong>${answer.data[i].from}</strong> para <strong>${answer.data[i].to}</strong> ${answer.data[i].text}</span>
            </div>`
        }
        else {
            main.innerHTML += `
            <div class="message directMessage">
                <span class="time">${answer.data[i].time}</span>
                <span class="text"><strong>${answer.data[i].from}</strong> reservadamente para <strong>${answer.data[i].to}</strong> ${answer.data[i].text}</span>
            </div>`
        }
    }
    //console.log(last)
    //console.log(document.querySelectorAll('main .message')[document.querySelectorAll('main .message').length-1])
    if (last != document.querySelectorAll('main .message')[document.querySelectorAll('main .message').length-1].innerHTML){
        last = document.querySelectorAll('main .message')[document.querySelectorAll('main .message').length-1].innerHTML
        main.querySelectorAll('.message')[[document.querySelectorAll('main .message').length-1]].scrollIntoView()
    }
}


function PopUpScreen(){
    const promisse = axios.get('https://mock-api.driven.com.br/api/v4/uol/participants')
    promisse.then(participants)
}
function participants(answer) {
    let PeopleOn = document.querySelector('.PeopleOn')
    PeopleOn.innerHTML = ""
    for (let i = 0; i<answer.data.length; i++) {
        // if do meu nome
        PeopleOn.innerHTML += `
        <div class="line" onclick="chooseAPerson(this)">
            <div class="withoutCheck">
                <ion-icon name="person-circle"></ion-icon>
                <h1>${answer.data[i].name}</h1>
            </div>
            <ion-icon class="check vanishDisplay" name="checkmark"></ion-icon>
        </div>`
    }
    document.querySelector('.chooseAPerson').classList.remove('vanishDisplay')
}
function clickBlackScreen(){
    document.querySelector('.chooseAPerson').classList.add('vanishDisplay')
}


function chooseAPerson(element){
    const people = document.querySelector('.people')
    const NumberOfChecks = people.querySelectorAll('.check')
    for (let i = 0; i < NumberOfChecks.length; i++) {
        NumberOfChecks[i].classList.add('vanishDisplay')
        NumberOfChecks[i].classList.remove('selected')
    }
    element.querySelector('.vanishDisplay').classList.remove('vanishDisplay')
    element.querySelector('.vanishDisplay').classList.add('selected')
    // to = document.querySelector('.selected').parentElement.querySelector('h1').innerHTML
    // if(element === document.querySelector('.line')){
    //     chooseTodos()
    // }

}
function chooseTodos(){
    const NumberOfChecks = document.querySelectorAll('.visibility .check')
        for (let i = 0; i < NumberOfChecks.length; i++) {
            NumberOfChecks[i].classList.add('vanishDisplay')
            NumberOfChecks[i].classList.remove('selected')
        }
    const element = document.querySelector('.visibility .line')
    element.querySelector('.vanishDisplay').classList.remove('vanishDisplay')
    element.querySelector('.vanishDisplay').classList.add('selected')
    to = "Todos"
}
function chooseAVisibility(element){
    const todos = document.querySelector('.line .check').classList.contains('vanishDisplay')
    if(todos){
        const NumberOfChecks = document.querySelectorAll('.visibility .check')
        for (let i = 0; i < NumberOfChecks.length; i++) {
            NumberOfChecks[i].classList.add('vanishDisplay')
            NumberOfChecks[i].classList.remove('selected')
        }
        element.querySelector('.vanishDisplay').classList.remove('vanishDisplay')
        element.querySelector('.vanishDisplay').classList.add('selected')
        // type = document.querySelector('.visibility .selected').parentElement.querySelector('h1').innerHTML
        // if (type === "Todos"){
        //     type = "Todos"
        // }
        // else {
        //     type = 'private_message'
        // }
    }
    else if (element == document.querySelectorAll('.visibility .line')[1] ){
        element.classList.add('deniedCheck')
        setTimeout(delay, 500)
    }
}
function delay(){
    document.querySelector('.deniedCheck').classList.remove('deniedCheck')
}


function sendMessage(){
    //const to = document.querySelector('.selected').parentElement.querySelector('h1').innerHTML
    const text = document.querySelector('footer input').value
    //const type = document.querySelector('.visibility .selected').parentElement.querySelector('h1').innerHTML

    const message = {from: nameUser, to, text, type}
    const promisse = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', message)
    promisse.then(certo)
    promisse.catch(errou)
    document.querySelector('footer input').value = ''
}
function certo(){
    console.log('foi')
}
function errou(resposta){
    console.log(resposta.response)
}

let to
let type
let last = document.querySelectorAll('main .message')[document.querySelectorAll('main .message').length-1].innerHTML

