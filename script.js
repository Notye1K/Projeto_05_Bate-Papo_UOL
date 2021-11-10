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
    if (last != document.querySelectorAll('main .message')[document.querySelectorAll('main .message').length-1]){
        last = document.querySelectorAll('main .message')[document.querySelectorAll('main .message').length-1]
        main.querySelectorAll('.message')[[document.querySelectorAll('main .message').length-1]].scrollIntoView()
    }
}

load()
setInterval(load,3000)
let last = document.querySelectorAll('main .message')[document.querySelectorAll('main .message').length-1]
