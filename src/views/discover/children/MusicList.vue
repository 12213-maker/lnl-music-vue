<template>
  <div class="d">
      <div class="musicLists">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  name:'MusicList'
}
</script>

<style scoped>
.d{
  background-color: cadetblue;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}
.musicLists{
  background-color: rgb(204, 135, 109);
  max-width: 1010px;
  padding: 10px;
  width: 100%;
}
</style>