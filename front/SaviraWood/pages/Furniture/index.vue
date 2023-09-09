<script setup>
const hidButton = () => {
    show.value = false;
    console.log(show.value)
};
const addAlert = () => {
    show.value = true;
    console.log(show.value)
};
</script>

<template>
  <div>
    <CartAlert :show="show ? true : false" :id="4" />
    <p>
      <button @click="hidButton">Hid alert</button>
      <br>
      <button @click="addAlert">Add alert</button>
    </p> 
  </div>
</template>