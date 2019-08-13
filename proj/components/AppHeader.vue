<template>
  <div class="header-container">
    <div class="container">
      <img src="../assets/spectrum-logo.png" />
      <hr />
      <div>
        <div class="router-buttons">
          <nuxt-link active-class="active" exact :to="{ name: 'index' }"
            >Home</nuxt-link
          >
          <nuxt-link active-class="active" :to="{ name: 'list' }"
            >Item List</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

.header-container {
  /* padding: 1em; */
  height: 175px;
  background: $header-bg-color;
  display: flex;
  align-items: center;
}

.container {
  text-align: center;
}

.router-buttons {
  display: flex;
  justify-content: center;

  & > a {
    margin: 0 0.5em;
  }
}
</style>
