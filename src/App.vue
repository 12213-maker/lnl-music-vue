<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'app',
}
</script>

<style>
.router-link-active{
  background-color: aqua;
  border-radius: 20%;
  font-size: 40px;
  text-decoration: none;
}
</style>
