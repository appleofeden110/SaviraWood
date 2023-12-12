<script>
    export let data;
</script>
<div class="px-40">
    {#if data.message === 'nope'}
        <h1>404, not found</h1>
    {:else}
        <h1 class="text-center font-bold font-sans text-4xl mt-2">Welcome to your dashboard, {data.user.name}</h1>
        <div class="flex flex-row gap-4">
            <div class="flex flex-col border border-black rounded p-4 max-w-32 max-h-32">
                <ul>
                    <li>
                       <a href="/user/dashboard">Personal</a>
                    </li>
                    <li>
                        <a href="/user/dashboard/orders">Orders</a>
                    </li>
                </ul>
                <form action="?/signOut" method="POST">
                    <input type="submit" class="px-4 py-2  font-semibold text-green-700 bg-transparent border border-green-500 rounded hover:bg-green-500 hover:text-white hover:border-transparent" value="Sign out">
                </form>
            </div>
            <div class="w-[60rem] p-4">
                <h1 class="text-center text-2xl">Personal Details</h1>
                <form class="grid grid-cols-2 gap-2">
                    <label for="name">Name</label>
                    <label for="surname">Surname</label>
                    <input type="text" name="name" class="border rounded-2xl border-black">
                    <input type="text" name="surname" class="border rounded-2xl border-black">
                    <label for="phone">Phone</label>
                    <label for="email">Email</label>
                    <input type="tel" name="phone" class="border rounded-2xl border-black">
                    <input type="email" name="email" class="border rounded-2xl border-black">
                </form>
                <h1 class="text-center text-2xl">Delivery Address</h1>
                <form class="grid grid-cols-2 gap-2">
                    <label for="country">Country</label>
                    <label for="city">City</label>
                    <input type="text" name="country" class="border rounded-2xl border-black">
                    <input type="text" name="city" class="border rounded-2xl border-black">
                    <label for="county">County</label>
                    <label for="street">Street name</label>
                    <input type="text" name="county" class="border rounded-2xl border-black">
                    <input type="text" name="street" class="border rounded-2xl border-black">
                    <div class="flex flex-col">
                        <label for="postcode">Post-code/Zip-code</label>
                        <input type="text" class="border rounded-2xl border-black" name="postcode">
                    </div>
                </form>
                <h1 class="text-center text-2xl">Password</h1>
                <form class="gap-2 flex flex-row">
                    <div class="flex flex-col">
                        <label for="pass">Password</label>
                        <input type="text" name="pass" class="border rounded-2xl w-[29rem] border-black">
                    </div>
                    <div class="flex flex-col">
                        <label for="repeat">Repeat Password</label>
                        <input type="text" name="repeat" class="border rounded-2xl w-[29rem] border-black">
                    </div>
                </form>
            </div>
        </div>
    {/if}
</div>
