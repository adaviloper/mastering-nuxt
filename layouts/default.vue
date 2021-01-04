<template>
  <div>
    <header>
      <nuxt-link :to="{name: 'index'}">Home</nuxt-link>
      <input type="text" ref="citySearch" />
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$maps.makeAutoComplete(this.$refs.citySearch);
  }
};
</script>

<style scoped>
header {
  background-color: #eeeeee;
}
</style>
