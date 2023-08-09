<template>
    <div>
        <div class="grid grid-cols-4 gap-5">
            <div v-for="p in pictures">
                <a :href="`/pictures/${p.id}`">{{ p.name }}</a>
            </div>
        </div>
    </div>

    
</template>

<script setup>
const { data: pictures } = await useFetch('http://127.0.0.1:5000/pictures')
</script>

<style  scoped>

</style>