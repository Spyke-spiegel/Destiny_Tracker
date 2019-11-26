<template>
  <div class="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/header";

export default {
  name: "app",
  components: {
    Header
  }
};
</script>

<style>
:root {
  --primary-color: #e9e9e7;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  background: var(--primary-color);
  font-family: acumin-pro, sans-serif;
  color: #fff;
  line-height: 1.6;
}
a {
  color: #fff;
  text-decoration: none;
}
ul {
  list-style: none;
}
.body-bg-no-image {
  background: var(--primary-color);
}
.body-bg-image {
  /* background: var(--primary-color) url("./assets/bg.png") no-repeat top center; */
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -100;
  object-fit: cover;
}
.app {
  /* max-width: 960px; */
  /* margin: 1rem auto; */
  /* overflow: auto; */
  /* padding: 0 2rem; */
  /* width: 100vw;
  height: 100vh; */
}

@media (max-width: 700px) {
  body {
    background: var(--primary-color);
  }
}
</style>
