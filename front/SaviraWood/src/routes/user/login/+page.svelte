<div>
    <div class="container mx-auto overflow-hidden border rounded-md shadow-lg h-[32rem] w-96 my-10 px-5">
        <h1 class="text-[2rem] font-bold text-center">Log in</h1>
        <form class="flex flex-col" method="POST" action="?/login">
            <label for="emailInput">Email</label>
            <input type="text" id="emailInput" name="email" class="border border-black" required>
            <label for="passInput">Password</label>
            <input type="password" id="passInput" name="password" class="border border-black" required>
            <button type="submit" class="w-16 py-1 my-2 text-green-500 border border-green-500">Submit</button>
        </form>
    </div>
</div>

