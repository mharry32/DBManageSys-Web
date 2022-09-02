<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import "./css/normalize.css";

html,
body,
#app {
  height: 100%;
}
</style>