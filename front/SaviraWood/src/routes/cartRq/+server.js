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
    console.log("hui_st" + prod + "hui")
    console.log(7 + JSON.stringify(prod) + 8)
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