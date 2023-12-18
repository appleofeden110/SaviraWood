const response = await fetch('http://localhost:3333/products/read')
const prods = await response.json();
export function load({ params }) {
    const prod = prods.find((prod) => prod.id === parseInt(params.id));
    return {
        prod
    };
}
