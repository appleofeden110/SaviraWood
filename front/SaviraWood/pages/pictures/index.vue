<template>
    <div>
        <div class="grid grid-cols-4 mx-5 my-5 justify-items-center gap-x-5 gap-y-10"> 
            <div v-for="p in pictures" class=" overflow-hidden border rounded-md shadow-lg xl:h-[24rem]">
                <div class="p-4 px-4">
                    <NuxtImg src="/pics/Big_Ship/Big_Ship_View.jpg" class="rounded-md" />
                    <a :href="`/pictures/${p.id}`" class="font-bold tex-lg pr-[6rem]">{{ p.name }}</a>
                    <p>£{{ p.price }}</p>
                    <button class="inline px-4 py-2 font-semibold text-green-700 bg-transparent border border-green-500 rounded hover:bg-green-500 hover:text-white hover:border-transparent"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="inline-block w-6 h-6">
                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                      </svg>
                      <p class="inline">Add to the cart!</p></button>
                </div>    
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
        <div class="lg:flex">
            <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="">

            <div class="flex flex-col justify-between py-6 lg:mx-6">
                <a href="#" class="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                    How to use sticky note for problem solving
                </a>
                
                <span class="text-sm text-gray-500 dark:text-gray-300">On: 20 October 2019</span>
            </div>
        </div>
    </div>
    
</template>

<script setup>
const { data: pictures } = await useFetch('http://127.0.0.1:5000/pictures')

</script>

<style scoped>
</style>