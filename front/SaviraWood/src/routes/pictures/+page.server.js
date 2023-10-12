const response = await fetch('http://localhost:5050/products')
const data = await response.json()

export function load() {
    return {
        summaries: data.map((prod) => ({
            id: prod.id,
            name: prod.name,
            width: prod.width,
            height: prod.height,
            weight: prod.weight,
            price: prod.price
        }))
    };
}

export const actions = {
    default: async ({ cookies , request }) => {
        const data = await request.formData();
        
    }
}



