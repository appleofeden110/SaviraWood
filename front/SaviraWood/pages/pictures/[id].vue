<template>
    <div>
        <h1>Name: {{ pictures.name }}</h1>
        <p>price: {{ pictures.price }}</p>
        <p>photo: <nuxt-img :src="`/pics/Big_Ship/${prodName}.jpg`" alt="prod_pic" class="w-36" /></p>
    </div>
</template>

<script setup>
    const { id } = useRoute().params
    const { data: pictures } = await useFetch(`http://127.0.0.1:5000/pictures/${id}`)
    const prodName = "Big_Ship_View"
</script>

<style scoped>

</style>