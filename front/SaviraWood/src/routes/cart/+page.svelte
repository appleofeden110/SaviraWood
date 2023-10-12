<script>
    import prodPic from '$lib/pics/Big_Ship/Big_Ship_View.jpg'
</script>

<div class="flex ">
    <div class="w-3/4 h-[36rem] m-2 border-2 border-black rounded">
        <div>
            <h1 class="text-3xl font-bold text-center">
                Cart
            </h1>
        </div>
        <div>
            <div class="flex flex-col items-center">
                <div class="flex flex-row items-center justify-between w-[90%] h-[10rem] border-2 border-black rounded my-2">
                    <div class="flex flex-row items-center">
                        <div class="ml-6 overflow-hidden border-2 border-black rounded w-36">
                            <img src = {prodPic} alt="prodPic" />
                        </div>
                        <div class="flex flex-col mx-2">
                            <p class="text-xl font-bold">Furniture Name</p>
                            <p class="text-md">Price</p>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <button class="px-4 py-2 mr-5 font-semibold text-green-700 bg-transparent border border-green-500 rounded hover:bg-green-500 hover:text-white hover:border-transparent ">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="w-1/4 m-2 border-2 border-black rounded h-[36rem]">
        <div>
            <h1 class="text-3xl font-bold text-center">
                Price List
            </h1>
        </div>
        <div class="border-2 border-black h-[30rem] mx-2">

        </div>
        <div class="flex flex-col items-center py-2">
            <button class="px-4 py-2 font-semibold text-green-700 bg-transparent border border-green-500 rounded hover:bg-green-500 hover:text-white hover:border-transparent ">Purchase</button>
        </div>
    </div>
</div>