<template>
  <header>
    <router-link to="/">
      <img :src="image" />
    </router-link>
  </header>
</template>

<script>
export default {
  name: "header",
  data() {
    return {
      image: require("@/assets/logo.png")
    };
  }
};
</script>

<style scoped>
img {
  width: 300px;
  height: auto;
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 1000;
}

@media (max-width: 700px) {
  img {
    display: block;
    margin: auto;
  }
}
</style>