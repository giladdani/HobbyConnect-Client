// TODO: make URL const
async function login(username, password) {
    const promise = fetch('http://localhost:2718/api/users/login',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({username: username, password: password})
    })

    return promise;
}

async function get_user_details(userToken) {
    const response = await fetch('http://localhost:2718/api/users/about',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'GET'
    });
    
    if (response.status !== 200) throw new Error('Error while fetching user details');
    const data = await response.json();
    return data;
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
    if (response.status !== 201) throw new Error('Error while creating user');
    return response;
}

module.exports = {
    login,
    get_user_details,
    create_user
}