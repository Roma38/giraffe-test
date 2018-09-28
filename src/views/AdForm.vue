<template>
  <b-form @submit.prevent="onSubmit" class="border rounded my-3 p-3 container" v-if="userName">
    <h2 class="m-3">Create Ad</h2>

    <b-form-group label="Title: " horizontal label-text-align="sm-right">
      <b-col col md="8">
        <b-form-input type="text" v-model="title"></b-form-input>
      </b-col>
    </b-form-group>

    <b-form-group label="Description: " horizontal label-text-align="sm-right">
      <b-form-textarea v-model="description" rows="8" required></b-form-textarea>
    </b-form-group>
    
    <b-button type="submit" variant="success">{{ adId ? 'Save' : 'Create' }}</b-button>
  </b-form>
  <h1 v-else>Authorize first!!!</h1>
</template>

<script>
export default {
  data: function() {
    return {
      title: "",
      description: "",
      userName: localStorage.getItem("userName"),
      ads: JSON.parse(localStorage.getItem("ads")) || []
    };
  },
  computed: {
    adId() {
      return parseInt(this.$route.params.id, 10);
    }
  },
  mounted() {
    if (this.$route.params.id) {
      const ad = this.ads.find(ad => ad.id === this.adId);
      this.title = ad.title;
      this.description = ad.description;
    }
  },
  methods: {
    onSubmit() {
      if (this.adId) {
        const adIndex = this.ads.findIndex(ad => ad.id === this.adId);
        this.ads[adIndex].title = this.title;
        this.ads[adIndex].description = this.description;
        localStorage.setItem("ads", JSON.stringify(this.ads));
        this.$router.push({ name: "readAd", params: { id: this.adId } });
      } else {
        const newAd = {
          id: this.generateId(this.ads),
          title: this.title,
          description: this.description,
          authorName: this.userName,
          creationDate: new Date()
        };
        this.ads.push(newAd);
        localStorage.setItem("ads", JSON.stringify(this.ads));
        this.$router.push({ name: "readAd", params: { id: newAd.id } });
      }
    },
    generateId(array) {
      if (array.length < 1) {
        return 1;
      }

      const idArray = array.map(({ id }) => id);
      return Math.max(...idArray) + 1;
    }
  }
};
</script>
