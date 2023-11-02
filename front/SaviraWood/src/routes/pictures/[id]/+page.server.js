const response = await fetch('http://localhost:5050/products')
const prods = await response.json();
export function load({ cookies, params }) {
    const prod = prods.find((prod) => prod.id === parseInt(params.id));
    return {
        prod
    };
}
