<template>
  <div class="app">
    <header class="app-header">
      <div class="app-logo">
        <img
          src="~/assets/images/logo.svg"
        >
      </div>
      <div class="app-search">
        <input type="text" @change="changed" placeholder="Enter your address">
        <input type="text" class="datepicker" placeholder="Check in">
        <input type="text" class="datepicker" placeholder="Check out">
        <button>
          <img
              src="~/assets/images/icons/search.svg"
          >
        </button>
      </div>
      <div class="app-user-menu">
        <template v-if="isLoggedIn">
          <img src="~/assets/images/icons/house.svg" alt=""/>
          <div class="name">Host</div>
          <img :src="user.profileUrl" class="avatar" alt=""/>
        </template>
        <div v-show="!isLoggedIn" id="googleButton" class="ml-8"></div>
      </div>
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$maps.makeAutoComplete(this.$refs.citySearch);
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
  },

  methods: {
    changed(event) {
      console.log('default.vue@changed:19', event);
      const place = event.detail;
      if (!place.geometry) {
        return;
      }
      console.log('default.vue@changed:24', place);

      this.$router.push({
        name: 'search',
        query: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          label: this.$refs.citySearch.value,
        }
      })
    },
  }
};
</script>

<style scoped></style>
