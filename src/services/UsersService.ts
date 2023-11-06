interface User {
    username: string,
    password: string,
    fullName: string
}

async function login(username:string, password:string) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users/login`,
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

async function get_user_details(userToken:string) {
    let data;
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users/profile`,
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

async function create_user(user:User) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users`,
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

async function send_friend_request(userToken:string, username:string) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users/friends`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'POST',
        body: JSON.stringify({username: username})
    })
    const data = await response.text();
    return {status: response.status, data};
}

async function get_user_balance(userToken:string) {
    let data;
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users/balance`,
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

async function add_user_balance(userToken:string, amount:any) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users/balance`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'PUT',
        body: JSON.stringify({amount: amount})
    });
    
    const data = await response.text();
    return {status: response.status, data};
}

const UsersService = {
    login,
    get_user_details,
    create_user,
    send_friend_request,
    get_user_balance,
    add_user_balance
}
export default UsersService;