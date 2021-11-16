
function testName(){
    nameUser = document.querySelector('.screenOfName input').value
    let promisse = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants',{name: nameUser})
    promisse.then(vanishScreenOfName)
    promisse.catch(erro)
    let screen = document.querySelector(".screenOfName")
    screen.innerHTML = `
    <img src="logo_2.png" alt="logo uol">
    <img class="gif" src="spinning-loading.gif" alt="loading">
    <div class="loading">Entrando ...</div>
    `
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
    axios.post('https://mock-api.driven.com.br/api/v4/uol/status',{name: nameUser})
}
function erro(answer){
    let screen = document.querySelector(".screenOfName")
    screen.innerHTML = `
    <img src="logo_2.png" alt="logo uol">
    <input type="text" placeholder="Digite seu nome" onkeyup="ifEnter1(event)" data-identifier="enter-name">
    <div class="button" onclick="testName()" data-identifier="start">Entrar</div>
    `
    document.querySelector('.screenOfName input').placeholder= 'Digite outro nome'
    document.querySelector('.screenOfName input').value= ''
    console.log(answer.response)
    alert('Tente outro nome')
}


function load(){
    const promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    promisse.then(loadMessages)
}
function loadMessages (answer) {
    
    let main = document.querySelector('main')
    main.innerHTML = ""
    for (let i = 0; i<answer.data.length; i++) {
        if(answer.data[i].type=='status'){
            main.innerHTML += `
            <div class="message movimentMessage" data-identifier="message">
                <span class="time">${answer.data[i].time}</span>
                <span class="text"><strong>${answer.data[i].from}</strong> ${answer.data[i].text}</span>
            </div>`
        }
        else if(answer.data[i].type == 'message'){
            if (answer.data[i].to === 'nome do destinatário (Todos se não for um específico)'){
                main.innerHTML += `
                <div class="message normalMessage" data-identifier="message">
                    <span class="time">${answer.data[i].time}</span>
                    <span class="text"><strong>${answer.data[i].from}</strong> para <strong>${'Todos'}</strong>: ${answer.data[i].text}</span>
                </div>`
            }
            else{
                main.innerHTML += `
                <div class="message normalMessage" data-identifier="message">
                    <span class="time">${answer.data[i].time}</span>
                    <span class="text"><strong>${answer.data[i].from}</strong> para <strong>${answer.data[i].to}</strong>: ${answer.data[i].text}</span>
                </div>`
            }
        }
        else {
            if (answer.data[i].type === 'private_message' && answer.data[i].to !== 'Todos' && answer.data[i].to !== nameUser && answer.data[i].from !== nameUser ){
                continue
            }
            else{
                    main.innerHTML += `
                <div class="message directMessage" data-identifier="message">
                    <span class="time">${answer.data[i].time}</span>
                    <span class="text"><strong>${answer.data[i].from}</strong> reservadamente para <strong>${answer.data[i].to}</strong>: ${answer.data[i].text}</span>
                </div>`
            }
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
    let check
    if (document.querySelector('.PeopleOn .selected') === null) {
        check = null
    }
    else {
        check = document.querySelector('.PeopleOn .selected').parentElement.querySelector('.lineName').innerHTML
    }
    PeopleOn.innerHTML = ""
    for (let i = 0; i<answer.data.length; i++) {
        if (check === answer.data[i].name){
            PeopleOn.innerHTML += `
        <div class="line" onclick="chooseAPerson(this)" data-identifier="participant">
            <div class="withoutCheck">
                <ion-icon name="person-circle"></ion-icon>
                <div class="lineName">${answer.data[i].name}</div>
            </div>
            <ion-icon class="check selected" name="checkmark"></ion-icon>
        </div>`
        }
        else{
            PeopleOn.innerHTML += `
            <div class="line" onclick="chooseAPerson(this)" data-identifier="participant">
                <div class="withoutCheck">
                    <ion-icon name="person-circle"></ion-icon>
                    <div class="lineName">${answer.data[i].name}</div>
                </div>
                <ion-icon class="check vanishDisplay" name="checkmark"></ion-icon>
            </div>`
        }
    }
    document.querySelector('.chooseAPerson').classList.remove('vanishDisplay')
    if (intervalOfParticipants === 1){
        intervalOfParticipants = setInterval(PopUpScreen,10000)
        console.log('ativei intervalo')
    }
}
function clickBlackScreen(){
    document.querySelector('.chooseAPerson').classList.add('vanishDisplay')
    clearInterval(intervalOfParticipants)
    console.log('parei intervalo')
    intervalOfParticipants = 1
}


function chooseAPerson(element){
    const people = document.querySelector('.people')
    const NumberOfChecks = people.querySelectorAll('.check')
    for (let i = 0; i < NumberOfChecks.length; i++) {
        NumberOfChecks[i].classList.add('vanishDisplay')
        NumberOfChecks[i].classList.remove('selected')
    }
    element.querySelector('.vanishDisplay').classList.remove('vanishDisplay')
    element.querySelector('.check').classList.add('selected')
    to = document.querySelector('.selected').parentElement.querySelector('.lineName').innerHTML
    document.querySelector('.infoOfSending .to').innerHTML = to
    if(element === document.querySelector('.line')){
        chooseTodos()
    }

}
function chooseTodos(){
    const NumberOfChecks = document.querySelectorAll('.visibility .check')
        for (let i = 0; i < NumberOfChecks.length; i++) {
            NumberOfChecks[i].classList.add('vanishDisplay')
            NumberOfChecks[i].classList.remove('selected')
        }
    const element = document.querySelector('.visibility .line')
    element.querySelector('.vanishDisplay').classList.remove('vanishDisplay')
    element.querySelector('.check').classList.add('selected')
    to = "Todos"
    type = 'message'
    document.querySelector('.infoOfSending .to').innerHTML = 'Todos'
    document.querySelector('.infoOfSending .type').innerHTML = '(Público)'
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
        element.querySelector('.check').classList.add('selected')
        type = document.querySelector('.visibility .selected').parentElement.querySelector('h1').innerHTML
        if (type === "Público"){
            type = "message"
            document.querySelector('.infoOfSending .type').innerHTML = '(Público)'
        }
        else {
            type = 'private_message'
            document.querySelector('.infoOfSending .type').innerHTML = '(Reservadamente)'
        }
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
    const text = document.querySelector('footer input').value

    const message = {from: nameUser, to, text, type}
    const promisse = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', message)
    promisse.then(messageOk)
    promisse.catch(messageKo)
    document.querySelector('footer input').value = ''
}
function messageOk(){
    console.log('foi')
}
function messageKo(resposta){
    window.location.reload()
    console.log(resposta.response)
}

function ifEnter1(e){
    var key = e.keyCode;
    if (key == 13) { // codigo da tecla enter
      // colocas aqui a tua função a rodar
      testName()
    }
}
function ifEnter2(e){
    var key = e.keyCode;
    if (key == 13) { // codigo da tecla enter
      // colocas aqui a tua função a rodar
      sendMessage()
    }
}


let to = 'Todos'
let type = 'message'
let last = document.querySelectorAll('main .message')[document.querySelectorAll('main .message').length-1].innerHTML
let intervalOfParticipants = 1
let nameUser = ''
//nome do destinatário (Todos se não for um específico)

