async function generate_gift_code(userToken, amount) {
    const response = await fetch('http://localhost:2718/api/giftcodes',
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

async function redeem_gift_code(userToken, code) {
    const response = await fetch('http://localhost:2718/api/giftcodes',
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

async function grant_credits(userToken, amount, username) {
    const response = await fetch(`http://localhost:2718/api/users/${username}/credits`,
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

module.exports = {
    generate_gift_code,
    redeem_gift_code,
    grant_credits
}