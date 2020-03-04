<template>
  <div class="container">
    <!-- <img src="../assets/bg2.jpg" alt class="body-bg-image" /> -->
    <div class="loading" v-if="loading">
      <H3>Loading...</H3>
    </div>
    <div v-if="error">
      <h1>{{ error }}</h1>
      <router-link to="/">Go</router-link>
    </div>
    <div class="container-card">
      <ul class="character-card" v-bind:key="value" v-for="value in characterData">
        <img class="perso" src="../assets/Titan.png" v-if="value.classType === 0" />
        <img class="perso" src="../assets/Hunter.png" v-else-if="value.classType === 1" />
        <img class="perso" src="../assets/Warlock.png" v-else />
        <div class="tab-card">
          <img class="bg-card" :src="destinyWebsiteUrl+value.emblemBackgroundPath" />
          <div class="stat">
            <div>
              <h2 v-if="value.classType === 0">TITAN</h2>
              <h2 v-else-if="value.classType === 1">HUNTER</h2>
              <h2 v-else>WARLOCK</h2>
              <h2 v-if="value.raceType === 0">HUMAN</h2>
              <h2 v-else-if="value.raceType === 1">AWOKEN</h2>
              <h2 v-else>EXO</h2>
            </div>
            <div class="light">
              <h3>{{value.light}}</h3>
              <h3>{{value.level}}</h3>
            </div>
          </div>
        </div>
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
      characterData: null,
      destinyWebsiteUrl: "https://www.bungie.net"
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
.container {
  height: 100vh;
  width: 100vw !important;
  margin: 0;
  padding: 0;
  /* background: radial-gradient(white, grey); */
}

.perso {
  height: 50vh;
  width: auto;
}

.character-card {
  height: 70vh;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-content: center;
  position: relative;
}

.perso:hover {
  transform: scale(1.2);
  transition: transform 300ms ease-in-out;
  z-index: 1000;
}

.container-card {
  position: fixed;
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  color: black;
  bottom: 10vh;
  justify-content: space-evenly;
}

.tab-card {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* margin: 25px; */
  width: 100%;
  height: auto;
  color: white;
}

.stat {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  left: 20%;
  width: 80%;
  height: auto;
}
.stat > h2 {
  font-size: 25px;
}

.light {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 5%;
}

.bg-card {
  position: absolute;
  z-index: -100;
  width: 100%;
  height: auto;
}
</style>