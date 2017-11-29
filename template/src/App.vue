<template>
  <div id="app">
    <mt-button size="small" type="primary" @click.native="$router.goto('index')">Index</mt-button>
    <mt-button size="small" type="danger" @click.native="$router.goto('home')">Home</mt-button>
    <page-view/>
  </div>
</template>

<script>
export default {
  created () {
    window.abc = this
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
