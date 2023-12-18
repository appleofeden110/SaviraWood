export async function load({ cookies }) {
    const cookie = cookies.get('sessionId');
    console.log(cookie)
    if (!cookie) {
        console.log('cart creation was unsuccessful')
    } else {
        const response = await fetch(`http://127.0.0.1:3333/carts/read/${cookie}`);
        const cart = await response.json()
        console.log(cart)
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