<script>
    import prodPic from '$lib/pics/Big_Ship/Big_Ship_View.jpg'
    import {displayAlert, Alert_Type} from "$lib/stores";

    export let data;
    async function openAlert(n, wd, hg, wg, p, e) {
        if (data.cookie !== undefined){
            const prod = {
                name: n,
                width: wd,
                height: hg,
                weight: wg,
                price: p
            }
            const parsed = JSON.stringify(prod)
            const response = await fetch('/cartRq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: parsed
            })
            const cartMsg = await response.json();
            console.log(cartMsg.message)
            displayAlert(`<p>${cartMsg.message}</p>`, Alert_Type.SUCCESS);
        } else{
            displayAlert(`<a href="/signin">You are not registered, be sure to <strong>Sign in</strong> to add products to cart</a>`, Alert_Type.DANGER)
        }
    }
</script>


<div class="grid mx-5 my-5 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-x-5 gap-y-10">
    {#each data.summaries as {id, name, width, height, weight, price}}
        <div>
            <div class="overflow-hidden border rounded-md shadow-lg">
                <div class="p-4">
                    <img src={prodPic} alt="" class="rounded-md w-96">
                    <a href="/pictures/{id}" class="font-bold tex-lg pr-[4rem]">{name}</a>
                    <p>£{price}</p>
                        <button on:click={openAlert(name, width, height, weight, price)} type="submit" class="flex px-[16px] py-2 mt-4 font-semibold text-green-700 bg-transparent border border-green-500 rounded w-[180px] hover:bg-green-500 hover:text-white hover:border-transparent">
                            <span class="material-symbols-outlined">add_shopping_cart</span>
                            <span class="inline">Add to the cart</span>
                        </button>
                </div>
            </div>
        </div>
    {/each}
</div>


<style>
    .material-symbols-outlined {
        font-variation-settings:
                'FILL' 0,
                'wght' 400,
                'GRAD' 0,
                'opsz' 24

    }
</style>