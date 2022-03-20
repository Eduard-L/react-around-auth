const BASE_URL = 'https://register.nomoreparties.co'


function checkResponse(response) {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject(
        `something goes wrong: ${response.status} ${response.statusText}`
    );
}



export async function register(email, password) {

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

    return checkResponse(response);


}

export async function logIn(email, password) {

    const response = await fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
    return checkResponse(response);

}




export async function checkingTokenValidity(jwt) {

    if (!jwt) {
        throw new Error('your token in not valid')
    }

    const response = await fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers:
        {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }

    })
    return checkResponse(response);


}



