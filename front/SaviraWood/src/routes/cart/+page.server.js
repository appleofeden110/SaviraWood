export async function load({ cookies, request }) {
    const cookie = cookies.get('sessionId');
    console.log(cookie)
    if (!cookie) {
        console.log('cart creation was unsuccessful')
    } else {
        const response = await fetch(`http://127.0.0.1:5050/cart/${cookie}`);
        const cart = await response.json()
        return {
            cartProds: cart.map((prod) => ({
                prod_id: prod.prod_id,
                name: prod.name,
                width: prod.width,
                height: prod.height,
                weight: prod.weight,
                price: prod.price,
                session: cookie
            }))
        }
    }
}