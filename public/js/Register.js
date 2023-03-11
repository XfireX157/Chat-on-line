import {url} from './api/url.js'

(async function() {
    const main = document.querySelector('.container')
    
    if(window.location.href === url + "register.html") {
        main.querySelector('form').addEventListener('submit', async (e) => {
            e.preventDefault()
    
            const user = {
                name: main.querySelector('.name').value,
                email: main.querySelector('.email').value,
                password: main.querySelector('.password').value
            }
    
            const options = {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }
    
            await fetch(url + "registerUser", options)
                .then(response => response.json())
                .then((data) => console.log(data))
                .catch(err => console.log(err))
        })
    }

})()