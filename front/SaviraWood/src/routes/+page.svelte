<script>
    import logo from '$lib/pics/company_assets/SAVIRAWOOD est. 1992.png'
</script>


<!-- Hero section with background image, heading, subheading and button -->
<div
        class="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center"
        style="
      background-image: url('https://tecdn.b-cdn.net/img/new/slides/041.webp');
      height: 700px;
    ">
    <img src={logo} alt="" class="">
    <div
            class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
            style="background-color: rgba(0, 0, 0, 0.6)">
        <div class="flex h-full items-center justify-center">
            <div class="text-white">
                <h2 class="mb-4 text-6xl font-semibold">SaviraWood</h2>
                <h4 class="mb-6 text-xl font-semibold">Check out our products:</h4>
                <a type="button"
                   class="rounded border-2 border-neutral-50
                   px-7 pb-[8px] pt-[10px]
                   text-sm font-medium uppercase leading-normal text-neutral-50
                   transition duration-150 ease-in-out
                   hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100
                   focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200
                   active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                   data-te-ripple-init
                   data-te-ripple-color="light"
                   href="/pictures">
                    Wooden Pictures
                1</a>
                <a type="button"
                   class="rounded border-2 border-neutral-50
                   px-7 pb-[8px] pt-[10px]
                   text-sm font-medium uppercase leading-normal text-neutral-50
                   transition duration-150 ease-in-out
                   hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100
                   focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200
                   active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                   data-te-ripple-init
                   data-te-ripple-color="light"
                   href="/furniture">
                    Furniture
                </a>
                <!-- help !-->
                <ul class="flex flex-row text-2xl basis-1/3">
                    <li>
                        <p> Have any questions? Visit our help centre: </p>
                    </li>
                    <li>
                        <a href="/help" class="px-[16px] py-2 mt-4 font-semibold text-green-700 bg-transparent border border-green-500 rounded w-[180px] hover:bg-green-500 hover:text-white hover:border-transparent">Help</a>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</div>
