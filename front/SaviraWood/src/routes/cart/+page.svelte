<script>
    export let data;
    let totalPrice = 0;
    const products = data.cartProds;
    products.forEach((prod) => {
        totalPrice += prod.price
    })
    let hui = null
</script>

<div class="flex ">
    <div class="w-3/4 h-auto m-2 shadow-lg  rounded">
        <div>
            <h1 class="text-3xl font-bold text-center">
                Cart
            </h1>
        </div>
        <div class="overflow-y-auto max-h-[36rem]">
            {#each data.cartProds as {prod_id, name, width, height, weight, price, session_id }}
            <div class="flex flex-col items-center">
                <div class="flex flex-row items-center justify-between w-[90%] h-[10rem] border-2 border-grey rounded my-2">
                    <div class="flex flex-row items-center ">
                        <div class="ml-6 overflow-hidden shadow-lg border-2 border-gray-400 rounded w-36">
                            <img src="../../../src/lib/pics/Big_Ship/Big_Ship_View.jpg" alt="prodPic" />
                        </div>
                        <div class="flex flex-col mx-2">
                            <p class="text-xl font-bold">{name}</p>
                            <p class="text-lg font-semibold">£{price}</p>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <button class="px-4 py-2 mr-5 font-semibold text-green-700 bg-transparent border border-green-500 rounded hover:bg-green-500 hover:text-white hover:border-transparent ">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            {/each}
        </div>
        <div>
            <h1 class="text-3xl font-bold text-center text-white">
                transparent
            </h1>
        </div>
    </div>
    <div class="w-1/4 m-2 rounded h-auto">
        <div>
            <h1 class="text-3xl font-bold text-center">
                Price List
            </h1>
        </div>
        <div class="border-l-2 border-b-2 border-grey h-[30rem] mx-2">
            {#each data.cartProds as {prod_id, name, width, height, weight, price, session_id }}
                <p>£{price}</p>
            {/each}
        </div>
        <div class="flex flex-col items-center py-2">
            <h1 class="text-2xl font-semibold m-2">Total Price: £{totalPrice}</h1>
            <button class="px-4 py-2 font-semibold text-green-700 bg-transparent border border-green-500 rounded hover:bg-green-500 hover:text-white hover:border-transparent ">Purchase</button>
        </div>
    </div>
</div>