<template>
  <b-jumbotron :header="ad.title" :lead="ad.description" class="container position-relative">
    <i class="float-right">{{ad.authorName}}, {{new Date(ad.creationDate).toLocaleString()}}</i>
    <b-button v-if="userName === ad.authorName" @click="delAd(ad.id)" variant="danger" class="position-absolute del-button">X</b-button>
  </b-jumbotron>
</template>

<script>
export default {
  data: function() {
    return {
      ads: JSON.parse(localStorage.getItem("ads")),
      userName: localStorage.getItem("userName")
    };
  },
  computed: {
    ad() {
      return this.ads.find(item => item.id == this.$route.params.id);
    }
  },
  methods: {
    delAd(id) {
      const adIndex = this.ads.findIndex(ad => ad.id === id);
      this.ads.splice(adIndex, 1);
      localStorage.setItem("ads", JSON.stringify(this.ads));
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.del-button {
  top: 10px;
  right: 10px;
}
</style>
