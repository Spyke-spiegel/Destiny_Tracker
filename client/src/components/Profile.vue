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
              <div
                v-if="items.blizzardDisplayName"
              >Blizzard gamertag {{ items.blizzardDisplayName }}</div>
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
  name: "Profile",
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

      this.characterData = res.data.Response;
      window.console.log(this.characterData);
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = error.response.data.message;
    }
  }
};
</script>