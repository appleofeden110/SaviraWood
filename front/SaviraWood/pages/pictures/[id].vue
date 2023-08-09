<template>
    <div >
        <h1>Name: {{ pictures.name }}</h1>
        <p>price: {{ pictures.price }}</p>
        <p>photo</p>
    </div>
</template>

<script setup>
    const { id } = useRoute().params
    const { data: pictures } = useFetch(`http://127.0.0.1:5000/pictures/${id}`)
</script>

<style lang="scss" scoped>

</style>