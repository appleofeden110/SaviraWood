<template>
    <h2>
        About
    </h2>

    <p>fuck off, nothings' about, mate</p>

    <p>{{ data }}</p>
</template>

<script setup>
const { data } = await useFetch('/api/backend?name=mario')
</script>