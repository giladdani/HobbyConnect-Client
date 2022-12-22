// TODO: make URL const
async function login(username, password) {
    const response = await fetch('http://localhost:2718/api/users/login',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({username: username, password: password})
    })

    const data = await response.text();
    return {status: response.status, data};
}

async function get_user_details(userToken) {
    let data
    const response = await fetch('http://localhost:2718/api/users/profile',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'GET'
    });
    
    if(response.status === 200){
        data = await response.json();
    }
    else{
        data = await response.text();
    }
    return {status: response.status, data};
}

async function create_user(user) {
    const response = await fetch('http://localhost:2718/api/users',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({username: user.username, password: user.password, fullName: user.fullName})
    })
    const data = await response.text();
    return {status: response.status, data};
}

module.exports = {
    login,
    get_user_details,
    create_user
}