<script setup>

</script>

<template>
    <header class="shadow-lg bg-slate-200">
        <nav class="container flex justify-between p-4 mx-auto">
             
            <ul class="flex content-center list-none">
                <li>
                    <nuxt-link to="/"><nuxt-img src="/pics/company_assets/SAVIRA.svg" alt="" class="w-36" /></nuxt-link>                
                </li>
            </ul>
            <ul class="flex content-center justify-start gap-4 list-none">
                <li><NuxtLink to="/" class="">Home</NuxtLink></li>
                <li><NuxtLink to="/About" class="">About</NuxtLink></li>
                <li><nuxt-link to="/Furniture" class="">Furniture</nuxt-link></li>
                <li><nuxt-link to="/pictures" class="">Pictures</nuxt-link></li>
            </ul>
            <ul class="flex content-center gap-4 mx-4 list-none">
                <li>
                    <nuxt-link to="/Cart">Cart</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/Login">Account</nuxt-link>
                </li>
            </ul>
        </nav>
    </header>

    <div>
        <slot />
    </div>
</template>

<style scoped>
    .router-link-exact-active {
        color: rgb(235, 163, 30);
    }
</style>