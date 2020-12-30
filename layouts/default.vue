<template>
  <div>
    <header>
      <nuxt-link :to="{name: 'index'}">Home</nuxt-link>
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  background-color: #eeeeee;
}
</style>
