<template>
  <div class="home container">
    <div v-if="authorized" class="text-right mb-2">
      <b-badge variant="success" class="mx-2 p-2" pill>{{userName}}</b-badge>
      <b-button @click="logOut" variant="outline-success">Log out</b-button>
    </div>

    <b-form v-else @submit.prevent="onSubmit">
      <b-form-group label="UserName:" horizontal>
        <b-form-input v-model="userName" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" horizontal>
        <b-form-input v-model="password" required type="password" :state="validPassword"></b-form-input>
        <b-form-invalid-feedback>Wrong password!</b-form-invalid-feedback>
      </b-form-group>
      <b-button variant="success" type="submit" class="mb-2">Submit</b-button>
    </b-form>

    <div id="adCards">
      <b-card v-for="ad in shownAds" :key="ad.id" class="text-left mb-1 position-relative" header-tag="header">
        <h4 slot="header" @click="$router.push({ name: 'readAd', params: { id: ad.id }})" class="card-header">{{ad.title}}</h4>
        {{ ad.description }}
        <b-button v-if="userName === ad.authorName && authorized" @click="editAd(ad.id)" variant="outline-success" class="float-right">Edit</b-button>
        <p slot="footer" class="text-right">{{new Date(ad.creationDate).toLocaleString()}} <em>{{ad.authorName}}</em></p>
        <b-button v-if="userName === ad.authorName && authorized" @click="delAd(ad.id)" variant="danger" class="position-absolute del-button">X</b-button>
      </b-card>
    </div>

    <b-pagination align="center" :total-rows="ads.length" v-model="currentPage" :per-page="5" aria-controls="adCards"></b-pagination>
    
    <router-link to="/edit" tag="b-button" class="create-btn" v-if="authorized">Create Ad</router-link>
  </div>
</template>

<script>
export default {
  name: "home",
  data: function() {
    return {
      authorized: localStorage.getItem("userName") ? true : false,
      userName: localStorage.getItem("userName"),
      password: "",
      validPassword: null,
      currentPage: 1,
      ads: JSON.parse(localStorage.getItem("ads")) || [],
      users: JSON.parse(localStorage.getItem("users")) || []
    };
  },
  computed: {
    shownAds() {
      return this.ads.slice(this.currentPage * 5 - 5, this.currentPage * 5);
    }
  },
  methods: {
    onSubmit() {
      const user = this.users.find(item => item.userName === this.userName);
      if (user) {
        if (user.password === this.password) {
          localStorage.setItem("userName", this.userName);
          this.authorized = true;
        } else {
          this.validPassword = false;
        }
      } else {
        this.users.push({
          id: this.generateId(this.users),
          userName: this.userName,
          password: this.password
        });
        localStorage.setItem("userName", this.userName);
        localStorage.setItem("users", JSON.stringify(this.users));
        this.password = "";
        this.authorized = true;
      }
    },
    logOut() {
      this.userName = "";
      this.password = "";
      localStorage.setItem("userName", this.userName);
      this.authorized = false;
    },
    generateId(array) {
      if (array.length < 1) {
        return 1;
      }

      const idArray = array.map(({ id }) => id);
      return Math.max(...idArray) + 1;
    },
    delAd(id) {
      const adIndex = this.ads.findIndex(ad => ad.id === id);
      this.ads.splice(adIndex, 1);
      localStorage.setItem("ads", JSON.stringify(this.ads));
      this.$forceUpdate();
    },
    editAd(id) {
      this.$router.push({ path: "/edit/" + id, params: { id: id } });
    }
  }
};
</script>

<style scoped>
.del-button {
  top: 10px;
  right: 10px;
}
.card-header {
  cursor: pointer;
}
.create-btn {
  background-color: #28a745;
}
</style>
