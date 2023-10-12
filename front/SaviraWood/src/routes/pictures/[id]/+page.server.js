const response = await fetch('http://localhost:5050/products')
const prods = await response.json();
export function load({ params }) {
    const prod = prods.find((prod) => prod.id === parseInt(params.id));
    console.log(params.id)
    return {
        prod
    };
}
