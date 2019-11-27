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
      <ul :key="items" v-for="items in profileData">
      <router-link :to="`/profile/${items.membershipId}`">
        <div class="card">
          <img class="img-card" :src="'https://www.bungie.net' + items.profilePicturePath" />
          <div class="text">
            <div class="namePlayer">{{ items.displayName }}</div>
            {{items.membershipId}}
            <div v-if="items.blizzardDisplayName">Blizzard gamertag {{ items.blizzardDisplayName }}</div>
            <div v-if="items.steamDisplayName">Steam gamertag {{ items.steamDisplayName }}</div>
          </div>
        </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      loading: false,
      error: null,
      profileData: null
    };
  },
  beforCreate() {
    document.body.className = "body-bg-no-image";
  },
  async created() {
    this.loading = true;
    try {
      const res = await axios.get(
        `/api/v1/search/${this.$route.params.gamertag}`
      );

      this.profileData = res.data.Response;
      window.console.log(this.profileData);
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
  text-align: center
}

.namePlayer{
  font-size: 30px;
  text-transform: uppercase;
  text-align: center
}

.img-card {
  width: auto;
  height: 90%;
  display: inline;
  margin-left: 10px;
}
</style>