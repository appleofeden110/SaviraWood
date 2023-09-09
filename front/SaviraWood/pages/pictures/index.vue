<template>
    <div v-for="p in pictures">
        <CartAlert ref="Alert" class="al" :show="show ? true : false" :id="p.id"/>
        <div class="grid mx-5 my-5 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-x-5 gap-y-10"> 
            <div :key="p.id" class="overflow-hidden border rounded-md shadow-lg">
                <div class="p-4" >
                    <NuxtImg src="/pics/Big_Ship/Big_Ship_View.jpg" class="rounded-md w-96" />
                    <a :href="`/pictures/${p.id}`" class="font-bold tex-lg pr-[4rem]">{{ p.name }}</a>
                    <p>£{{ p.price }}</p>
                    <button ref="cartId" @click="cartButPress()" class="flex px-[16px] py-2 mt-4 font-semibold text-green-700 bg-transparent border border-green-500 rounded w-[180px] hover:bg-green-500 hover:text-white hover:border-transparent">
                        <ShoppingCartIcon class="inline w-6 h-6 mr-2" /><p class="inline">Add to the cart</p>
                    </button>
                </div>    
            </div>
        </div>
    </div>
</template>

<script setup>
import { ShoppingCartIcon }  from '@heroicons/vue/24/outline'
const { data: pictures } = await useFetch('http://127.0.0.1:5000/products');

onMounted(() => {
    console.log('mounted')
})

onUpdated(() => {
    console.log('updated')
})

const cartButPress = () => {
    console.log(cartId.value.id);
    show.value = true;
}
const cartId = ref({
    id: pictures.id
});
</script>

<style scoped>

</style>