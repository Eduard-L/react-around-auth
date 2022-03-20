const BASE_URL = 'https://register.nomoreparties.co'

function handleRequestError(response) {

    return Promise.reject(`something went wrong, ${response.status}, ${response.statusText}`)

}

export async function register(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        })

        if (response.status === 201) {
            return response.json()
        }
        else {
            handleRequestError(response);
        }

    }
    catch (e) {
        console.log('something went wrong while register', e)
    }


}

export async function logIn(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/signin`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        })
        if (response) {
            return response.json()
        }
        else {
            handleRequestError(response);
        }


    }
    catch (e) {
        console.log("something went wrong while logIn ", e)
    }

}

export async function checkingTokenValidity(jwt) {

    if (!jwt) {
        throw new Error('your token in not valid')
    }
    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }

        })
        if (response) {
            return response.json();
        }
        else {
            handleRequestError(response);
        }
    }
    catch (e) {
        console.log("something went wrong while checking your token", e)
    }
}



