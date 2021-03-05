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
        <img
            src="~/assets/images/icons/house.svg"
        >
        <div class="name">Host</div>
        <img
            src="~/assets/images/user.jpg"
            class="avatar"
        >
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
