<template>
    <div>
        <div class="relative px-4 py-3 text-green-700 bg-green-100 border border-green-400 rounded" role="alert">
            <strong class="font-bold">Congrats! </strong>
            <span class="block sm:inline" v-for="p in pictures">Your {{ p.name }} is added to the cart.</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg class="w-6 h-6 text-green-500 fill-current" @click="hidButton" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
    </div>
</template>

<script setup>
const hidButton = () => { 
    console.log('clicked')
    document.querySelector('.bg-green-100').style.display = 'none'};

const { id } = useRoute().params;
const { data: picture} = await useFetch(`http://127.0.0.1:5000/pictures/${id}`);
const { data: pictures} = await useFetch('http://127.0.0.1:5000/pictures');
</script>

