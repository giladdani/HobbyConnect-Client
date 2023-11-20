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

async function generate_gift_code(userToken:any, value:any) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/giftcodes/generate`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'POST',
        body: JSON.stringify({value})
    })

    const data = await response.json();
    return {status: response.status, data};
}

async function insert_gift_code(userToken:any, code:string, value:any) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/giftcodes`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'POST',
        body: JSON.stringify({code, value})
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

function format_datetime(datetime:string) {
    const dateObject = new Date(datetime);
    const day = String(dateObject.getUTCDate()).padStart(2, '0');
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
    const year = dateObject.getUTCFullYear();
    const hours = String(dateObject.getUTCHours()).padStart(2, '0');
    const minutes = String(dateObject.getUTCMinutes()).padStart(2, '0');
    const formattedDateTime = `${day}/${month}/${year} - ${hours}:${minutes}`;
    return formattedDateTime;
}

const UtilsService = {
    get_gift_codes,
    generate_gift_code,
    insert_gift_code,
    redeem_gift_code,
    format_datetime
}

export default UtilsService;