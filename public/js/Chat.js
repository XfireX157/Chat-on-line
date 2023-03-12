;(function () {
    const main = document.querySelector('main');

    let name;
    let image;
    const socket = io();

    main.querySelector('.join-chat #picture__input').addEventListener('change', (e) => {
        const src = URL.createObjectURL(e.target.files[0])
        const preview = main.querySelector('.join-form .picture__img')
        preview.src = src
        preview.style.display = "block"
        image = src

        main.querySelector('.join-form .choose').style.display = "none"
    })

    //-------------------Logout-account-----------------------//
    main.querySelector('.join-input button').addEventListener('click', () => {
        const userName = main.querySelector('.join-input #userName').value

        if (userName.length == 0) {
            return;
        }
        main.querySelector('.join-chat').classList.remove('active')
        main.querySelector('.chat-screen').classList.add('active')

        name = userName
        main.querySelector('.messages .update').textContent = name + ' is joined the conversation '

        main.querySelector(".chat-screen .img_user").src = image

        userName.value = ''
    });
    //-------------------Exist-account------------------------//
    main.querySelector('.chat-screen #exist-chat').addEventListener('click', () => {
       socket.emit('existuser', name)
       window.location.href = window.location.href
    });
    //-------------------Send-Messagem------------------------//
    main.querySelector('.typebox #message-send').addEventListener('click', () => {
        let message = main.querySelector('.typebox #message-input').value
        if(image_upload == null && message.length == 0){
            return;
        }

        renderMessage("my", {
            username: name,
            text: message,
            img: image,
            image_upload: image_upload
        })
        socket.emit("chat", {
            username: name,
            text: message,
            img: image,
            image_upload: image_upload
        })

        main.querySelector('.typebox #message-input').value = ''
    });
    //------------------------Time-----------------------------//
    function getTime () {
        let today = new Date()
        let hours = today.getHours()
        let minutes = today.getMinutes()

        if(hours < 10) {
            hours = "0" + hours
        }

        if(minutes < 10){
            minutes = "0" + minutes
        }

        let time = hours + ":" + minutes
        return time
    };

    let time = getTime();

    socket.on("update", (update) => {
        renderMessage("update", update)
    });

    socket.on("chat", (message) => {
        renderMessage("other", message)
    });

    function renderMessage(type, message) {
        const messageContainer = main.querySelector('.chat-screen .messages')
        if(type == "my"){
            const el = document.createElement('div')
            el.setAttribute('class', "message my-message")
            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                        ${!message.image_upload ? "" : `<img src=${message.image_upload} alt="img_user" class="img-send"></img>`}   
                        <div class="text">
                            <div class="text-box">${message.text}</div>
                            <span class="time">${time}</span>
                        </div>
                    </div>
                <img src=${message.img} alt="img_user" class="img_user img_chat-user">
            `
            messageContainer.appendChild(el)

        }else if(type == "other"){
            const el = document.createElement('div')
            el.setAttribute('class', "message other-message")
            el.innerHTML = `
                <img src=${message.img} alt="img_user" class="img_user img_chat-other">
                <div>
                    <div class="name">${message.username}</div>
                    ${!message.image_upload ? "" : `<img src=${message.image_upload} alt="img_user" class="img-send"></img>`}
                    <div class="text">
                        <p class="text-box">${message.text}</p>
                        <span class="time">${time}</span>
                    </div>
                </div>
               
            `
            messageContainer.appendChild(el)
        }else if(type == "update"){
            const el = document.createElement('div')
            el.setAttribute('class', "update")
            el.innerText = message
            messageContainer.appendChild(el)
        }
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight
    };
})()