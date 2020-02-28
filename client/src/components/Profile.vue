<template>
  <div class="container">
    <h1>Hello world</h1>
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
        `/api/v1/profile/${this.$route.params.membershipId}`
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