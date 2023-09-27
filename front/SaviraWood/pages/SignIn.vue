<template>
    <div>
        <div class="container mx-auto overflow-hidden border rounded-md shadow-lg h-[32rem] w-96 my-10 px-5">
            <h1 class="text-[2rem] font-bold text-center">Login</h1>
            <form class="flex flex-col">
                <label for="emailinput">Email</label>
                <input type="text" name="emailinput" class="border">
                <label for="passinput">Password</label>
                <input type="password" name="passinput" class="border">
                <button type="submit" class="w-16 py-1 my-2 text-green-500 border border-green-500">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>

</style>