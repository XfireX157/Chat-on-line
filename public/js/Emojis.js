(function () {
    const main = document.querySelector('main');

    main.querySelector(".typebox .box_emojis").addEventListener('click', () => {
        main.querySelector(".typebox_emojis").classList.toggle('typebox_emojis_active')
    })

    fetch("https://emoji-api.com/emojis?access_key=c3f3c202ef66b65c752cd32646891a917d262aad")
        .then(response => response.json())
        .then(data => renderEmoji(data))
        .catch(err => console.log(err))

    async function renderEmoji(data) {
        await data.forEach(emoji => {
            const li = document.createElement('li')
            li.setAttribute("emoji-name", emoji.slug)
            li.textContent = emoji.character
            main.querySelector(".typebox_emojis ul").appendChild(li)

            li.addEventListener("click", () => {
                let message = main.querySelector('.typebox #message-input')
                message.value += li.textContent
            })
        });
    }

    main.querySelector('.typebox_emojis #search').addEventListener('keyup', (e) => {
        const value = e.target.value;
        const emojis = document.querySelectorAll(".typebox_emojis ul li");
        emojis.forEach(data => {
            if(data.getAttribute('emoji-name').toLocaleLowerCase().includes(value)){
                data.style.display = "flex";
            }else {
                data.style.display = "none";
            }
        })
    })
})()