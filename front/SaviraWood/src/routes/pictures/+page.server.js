export async function load({cookies}) {
    const response_p = await fetch('http://127.0.0.1:3333/products/read')
    const prods = await response_p.json();
    const response_c = await fetch(`http://127.0.0.1:3333/carts/read/${cookies.get('sessionId')}`)
    const cart = await response_c.json();
    return {
        summaries: prods.map((prod) => ({
            id: prod.id,
            name: prod.name,
            width: prod.width,
            height: prod.height,
            weight: prod.weight,
            price: prod.price
        })),
        carts: cart.map((prod) => ({
            prod_id: prod.id,
            name: prod.name,
            width: prod.width,
            height: prod.height,
            weight: prod.weight,
            price: prod.price,
            session_id: cookies.get('sessionId')
        })),
        cookie: cookies.get('sessionId')
    }
}