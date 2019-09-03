<template>
  <div>
    <p>Message</p>
    <button @click="clear">clear</button>
    <ul class="messageList">
      <li v-for="(item,i) in messages" :key="i + 'op'">{{item}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class message extends Vue {
  private get messages(): [] {
    return this.$store.getters.getMessage;
  }

  clear() {
    this.$store.commit("CLEAR_MESSAGE");
  }

  mounted() {}
}
</script>
<style lang="less" scoped>
ul {
  width: 400px;
  height: auto;
  overflow: hidden;
  margin: 20px auto;
  li {
    width: 400px;
    height: 20px;
    margin-bottom: 10px;
  }
}
</style>
