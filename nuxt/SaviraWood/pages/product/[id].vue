<template>
    <div>
        <h1>PICS</h1>
        <p>this is what I want to write: {{ id }}</p>

        <h1>PISKA NUMBER {{ id }}</h1>
    </div>
</template>

<script setup>
    const { id } = useRoute().params
</script>

<style lang="scss" scoped>

</style>