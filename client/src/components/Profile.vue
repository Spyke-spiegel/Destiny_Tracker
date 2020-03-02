<template>
  <div class="container">
    <img src="../assets/bg2.jpg" alt class="body-bg-image" />
    <div v-if="loading">
      <H3>Loading...</H3>
    </div>
    <div v-if="error">
      <h1>{{ error }}</h1>
      <router-link to="/">Go</router-link>
    </div>
    <div class="container-card">
      <ul id="v-for-object" class="demo">
        <li v-bind:key="value" v-for="value in characterData">{{ value }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  el: "#v-for-object",
  data() {
    return {
      loading: false,
      error: null,
      characterData: null
    };
  },
  beforCreate() {
    document.body.className = "body-bg-no-image";
  },
  async created() {
    this.loading = true;
    try {
      const res = await axios.get(
        `/api/v1/profile/${this.$route.params.membershipId}`
      );

      this.characterData = res.data;
      window.console.log(this.characterData);
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = error.response.data.message;
    }
  }
};
</script>

<style scoped>
.container-card {
  display: flex;
  margin-top: 200px;
  flex-direction: column;
  flex-wrap: wrap;
}

.card {
  display: flex;
  flex-direction: row;
  width: 400px;
  align-items: center;
  justify-content: space-between;
  /* margin: 25px; */
  height: 90px;
  color: black;
  background: rgba(0, 0, 0, 0.1);
}

.text {
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  margin-right: 20px;
  text-align: center;
}

.namePlayer {
  font-size: 30px;
  text-transform: uppercase;
  text-align: center;
}

.img-card {
  width: auto;
  height: 90%;
  display: inline;
  margin-left: 10px;
}
</style>