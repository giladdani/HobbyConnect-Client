import { StatusCodes } from "http-status-codes";

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

async function get_users(userToken:string) {
    let data;
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'GET'
    });
    
    if(response.status === StatusCodes.OK){
        data = await response.json();
    }
    else{
        data = await response.text();
    }
    return {status: response.status, data};
}

async function get_user(userToken:string, username:string) {
    let data;
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users/profile/${username}`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'GET'
    });
    
    if(response.status === StatusCodes.OK){
        data = await response.json();
    }
    else{
        data = await response.text();
    }
    return {status: response.status, data};
}

async function get_logged_user_details(userToken:string) {
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
    
    if(response.status === StatusCodes.OK){
        data = await response.json();
    }
    else{
        data = await response.text();
    }
    return {status: response.status, data};
}

async function update_user_status(userToken:string, username:string, status:string) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users/status`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'PUT',
        body: JSON.stringify({username: username, status: status})
    })
    const data = await response.text();
    return {status: response.status, data};
}

async function update_user_role(userToken:string, username:string, role:string) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users/role`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'PUT',
        body: JSON.stringify({username: username, role: role})
    })
    const data = await response.text();
    return {status: response.status, data};
}

async function delete_user(userToken:string, username:string) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users/${username}`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'DELETE'
    })
    const data = await response.text();
    return {status: response.status, data};
}

async function create_user(user:any) {
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

async function get_friends(userToken:string) {
    let data;
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users/friends`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'GET'
    });
    
    if(response.status === StatusCodes.OK){
        data = await response.json();
    }
    else{
        data = await response.text();
    }
    return {status: response.status, data: data.friends};
}

async function get_friend_requests(userToken:string) {
    let data;
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users/friends/requests`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'GET'
    });
    
    if(response.status === StatusCodes.OK){
        data = await response.json();
    }
    else{
        data = await response.text();
    }
    return {status: response.status, data};
}

async function send_friend_request(userToken:string, receiver:string) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users/friends/requests`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'POST',
        body: JSON.stringify({receiver: receiver})
    })
    const data = await response.text();
    return {status: response.status, data};
}

async function update_friend_request_status(userToken:string, sender:string,  answer:Boolean) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users/friends/requests`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'PUT',
        body: JSON.stringify({sender: sender, isAccepted: answer})
    });
    
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
    
    if(response.status === StatusCodes.OK){
        data = await response.json();
    }
    else{
        data = await response.text();
    }
    return {status: response.status, data};
}

async function add_user_balance(userToken:string, username:string, amount:number) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users/balance`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'PUT',
        body: JSON.stringify({username: username, amount: amount})
    });
    
    const data = await response.text();
    return {status: response.status, data};
}

const UsersService = {
    login,
    get_users,
    get_user,
    get_logged_user_details,
    update_user_status,
    update_user_role,
    delete_user,
    create_user,
    get_friends,
    get_friend_requests,
    send_friend_request,
    update_friend_request_status,
    get_user_balance,
    add_user_balance
}
export default UsersService;