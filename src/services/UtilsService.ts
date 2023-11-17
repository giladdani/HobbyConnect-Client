async function get_gift_codes(userToken:string) {
    let data;
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/giftcodes`,
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
    return {status: response.status, data: data};
}

async function generate_gift_code(userToken:any, amount:any) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/giftcodes/generate`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'POST',
        body: JSON.stringify({amount})
    })

    const data = await response.json();
    return {status: response.status, data};
}

async function insert_gift_code(userToken:any, code:string, amount:any) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/giftcodes`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'POST',
        body: JSON.stringify({code, amount})
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

const UtilsService = {
    get_gift_codes,
    generate_gift_code,
    insert_gift_code,
    redeem_gift_code
}

export default UtilsService;