<template>
  <div class="container">
    <div class="form-container">
      <img src="../assets/bg2.png" alt class="body-bg-image" />
      <section class="search">
        <h1>Track Player Stats</h1>
        <form v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <input
              type="text"
              name="text"
              v-model="gamertag"
              id="gamertag"
              placeholder="Xbox live Gamertag, PSN Id or Steam Gamertag"
            />
            <div class="form-group">
              <input type="submit" value="submit" class="btn" />
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      gamertag: ""
    };
  },
  // beforeCreate() {
  //   document.body.className = "body-bg-image";
  // },
  methods: {
    onSubmit() {
      if (!this.gamertag) {
        this.$toasted.show("Please enter a gamertag", {
          duration: 3000,
          icon: "exclamation-circle"
        });
      } else {
        this.$router.push(`/profile/${this.gamertag}`);
      }
    }
  }
};
</script>

<style scoped>
.search {
  background: rgba(0, 0, 0, 0.1);
  /* border: 4px #d4605e solid; */
  border-radius: 10px;
  margin-top: 1rem;
  margin-left: 5vw;
  padding: 2rem;
  position: absolute;
  transform: translateX(-130px);
  /* transform: translateY(50px); */
  bottom: 35vh;
  right: 50vw;
  width: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-group {
  margin: 1rem 0;
  width: 100%;
}

h1 {
  color: black;
  text-align: center;
}

input,
select,
textarea {
  display: block;
  width: 100%;
  padding: 0.4rem;
  font-size: 1.2rem;
  border: 1px solid black;
}
.btn {
  display: inline-block;
  background: var(--primary-color);
  color: black;
  padding: 0.4rem 1.3rem;
  border: none;
  cursor: pointer;
  outline: none;
  margin-top: 1rem;
}
</style>