<template>
  <div id="app">
    <p>Tour of Heroes</p>
    <div id="nav">
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/heroes">Heroes</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
*{
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
