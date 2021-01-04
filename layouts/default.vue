<template>
  <div>
    <header>
      <nuxt-link :to="{name: 'index'}">Home</nuxt-link>
      <input type="text" ref="citySearch" @changed="changed" />
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

<style scoped>
header {
  background-color: #eeeeee;
}
</style>
