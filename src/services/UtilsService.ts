async function generate_gift_code(userToken:any, amount:any) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/giftcodes`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'POST',
        body: JSON.stringify({amount})
    })

    const data = await response.text();
    return {status: response.status, data};
}

async function redeem_gift_code(userToken:string, code:string) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/giftcodes`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'PUT',
        body: JSON.stringify({code})
    })

    const data = await response.text();
    return {status: response.status, data};
}

async function grant_credits(userToken:string, amount:string, username:string) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/users/${username}/credits`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'PUT',
        body: JSON.stringify({amount, username})
    })

    const data = await response.text();
    return {status: response.status, data};
}

const UtilsService = {
    generate_gift_code,
    redeem_gift_code,
    grant_credits
}

export default UtilsService;