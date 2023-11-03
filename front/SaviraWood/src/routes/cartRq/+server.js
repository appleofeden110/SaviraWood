import { json } from '@sveltejs/kit'
export async function POST({request, cookies}) {
    const { name, width, height, weight, price } = await request.json()
    console.log(`hui + ${name} + ${height} `)
    const prod = {
        name,
        width,
        height,
        weight,
        price
    }
    const cookie = cookies.get('sessionId')
    const response = await fetch(`http://127.0.0.1:5050/cart/${cookie}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prod)
    })
    if (response.ok){
        return json({message: `Your ${name} added to cart!`}, {status: 201})
    } else {
        throw new Error('Request has not been successful: 400')
    }
}

export async function DELETE({request, cookies}) {
    const { name } = await request.json();
    const cookie = cookies.get('sessionId');
    const response = await fetch(`http://127.0.0.1:5050/cart/${cookie}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, session_id: cookie })
    })
    if (response.ok) {
        return json({message: `${name} has been deleted!`}, {status: 202})
    } else {
        throw new Error('Request has not been successful: 400')
    }
}