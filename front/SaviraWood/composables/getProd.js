export const getProd = async (id) => {
    const { data } = await useFetch(`http://127.0.0.1:5000/products/${id}`);
    return data;
}

