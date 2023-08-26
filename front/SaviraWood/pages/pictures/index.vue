<template>
    <div>
        <CartAlert ref="Alert" class="hidden" />
        <div class="grid grid-cols-4 mx-5 my-5 justify-items-center gap-x-5 gap-y-10"> 
            <div v-for="p in pictures" :key="p.id" class="overflow-hidden border rounded-md shadow-lg">
                <div class="p-4 px-4" >
                    <NuxtImg src="/pics/Big_Ship/Big_Ship_View.jpg" class="rounded-md w-96" />
                    <a :href="`/pictures/${p.id}`" class="font-bold tex-lg pr-[6rem]">{{ p.name }}</a>
                    <p>£{{ p.price }}</p>
                    <button ref="cartBtn" @click="cartButPress()" class="flex px-4 py-2 font-semibold text-green-700 bg-transparent border border-green-500 rounded hover:bg-green-500 hover:text-white hover:border-transparent">
                        <ShoppingCartIcon class="inline w-6 h-6 mr-2" /><p class="inline">Add to the cart</p>
                    </button>
                </div>    
            </div>
        </div>
    </div>
</template>

<script setup>
import { ShoppingCartIcon }  from '@heroicons/vue/24/outline'
import { onMounted, ref } from 'vue';



const { data: pictures } = await useFetch('http://127.0.0.1:5000/pictures')
</script>

<style scoped>
</style>