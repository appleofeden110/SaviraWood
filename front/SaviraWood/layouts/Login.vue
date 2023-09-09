<script setup>

</script>

<template>
    <Navbar />
    <div>
        <slot />
    </div>
</template>

<style scoped>
    .router-link-exact-active {
        color: rgb(235, 163, 30);
    }
</style>