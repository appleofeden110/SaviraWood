export async function load({cookies}) {
    const response = await fetch('http://127.0.0.1:5050/products')
    const prods = await response.json();
    console.log(cookies.get('sessionId'))
    return {
        summaries: prods.map((prod) => ({
            id: prod.id,
            name: prod.name,
            width: prod.width,
            height: prod.height,
            weight: prod.weight,
            price: prod.price
        })),
        cookie: cookies.get('sessionId')
    }
}