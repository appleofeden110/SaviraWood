<script setup>
const products = ref('');
getProd(2)
.then((data) => {
    products.value = data.value;
    console.log(products.value);
});

</script>

<template>
  <div>
    <CartAlert id=2 />
    <p>
      {{ products.name }}
    </p>
  </div>
</template>