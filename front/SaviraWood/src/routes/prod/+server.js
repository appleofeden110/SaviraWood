import { json } from "@sveltejs/kit";

export async function GET() {
    const products = await fetch('http://localhost:5050/1')
    console.log(products)
    return json(products)
}