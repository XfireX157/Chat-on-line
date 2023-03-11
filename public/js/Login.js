import {url} from './api/url.js'

(async function() {
    const main = document.querySelector('.container')
    
    if(window.location.href === url + "login") {
        main.querySelector('form').addEventListener('submit', async (e) => {
            e.preventDefault()
    
            const user = {
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
    
            await fetch(url + "loginUser", options)
                .then(response => response.json())
                .then((data) => console.log(data))
                .catch(err => console.log(err))
        })
    }

})()