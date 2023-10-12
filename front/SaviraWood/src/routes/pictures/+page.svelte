<script>
    import '$lib/components/CartAlert.svelte'
    import prodPic from '$lib/pics/Big_Ship/Big_Ship_View.jpg'
    import CartAlert from "$lib/components/CartAlert.svelte";
    import {cartAlertBtnState} from "$lib/stores.js";
    export let data;
    function openCart() {
        cartAlertBtnState.set(true)
    }
    function handleSubmit() {
        openCart()

    }
</script>
<CartAlert />

<div class="grid mx-5 my-5 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-x-5 gap-y-10">
    {#each data.summaries as {id, name, width, height, weight, price}}
        <div>
            <div class="overflow-hidden border rounded-md shadow-lg">
                <div class="p-4" >
                    <img src={prodPic} alt="" class="rounded-md w-96">
                    <a href="/pictures/{id}" class="font-bold tex-lg pr-[4rem]">{name}</a>
                    <p>£{price}</p>
                    <form method="POST">
                        <input type="text" bind:value={name} hidden />
                        <button id="btn" on:click={openCart} type="submit" class="flex px-[16px] py-2 mt-4 font-semibold text-green-700 bg-transparent border border-green-500 rounded w-[180px] hover:bg-green-500 hover:text-white hover:border-transparent">
                            <span class="material-symbols-outlined">add_shopping_cart</span><p class="inline">Add to the cart</p>
                        </button>
                    </form>
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