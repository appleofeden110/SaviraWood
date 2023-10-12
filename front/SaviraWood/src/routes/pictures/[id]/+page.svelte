<div class="flex flex-row">
    <div>
        <img src={prodPic} alt="prodPic">
    </div>
    <div>
        <h1 class="text-4xl">{data.prod.name}</h1>
        <p>£{data.prod.price}</p>
        <p>Details: <br> Width: {data.prod.width} <br> Height: {data.prod.height} <br> Weight: {data.prod.weight}</p>
    </div>
</div>

<script>
    export let data;
    import prodPic from '$lib/pics/Clocks_(Time_to_Live)/Clocks_TTL_all.jpg'
</script>