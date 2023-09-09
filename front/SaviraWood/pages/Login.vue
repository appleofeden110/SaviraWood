<template>
    <div>
        <div class="container mx-auto overflow-hidden border rounded-md shadow-lg h-[32rem] w-96 my-10 px-5">
          <h1 class="text-[2rem] font-bold text-center">Login</h1>
          <form action="" class="flex flex-col">
            <label for="">Email</label>
            <input type="text" class="border">
            <label for="">Password</label>
            <input type="password" class="border">
            <button type="submit" class="w-16 py-1 my-2 text-green-500 border">Submit</button>
          </form>
          <p>Not yet registered? <a href="/SignIn" class="font-bold">Register</a></p>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>

</style>