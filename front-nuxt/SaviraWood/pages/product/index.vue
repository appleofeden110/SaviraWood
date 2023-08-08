<template>
    <div>
        <div class="grid grid-cols-4 gap-5">
            <div v-for="p in data">
                <nuxt-link to="/product/`${p.id}`">{{ p.name }}</nuxt-link>
            </div>
        </div>
    </div>

    
</template>

<script setup>
const { data } = await useFetch('http://127.0.0.1:5000/product'); 


</script>

<style scoped>

</style>