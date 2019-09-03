<template>
  <div>
    <h3>{{curPeople.name}} Details</h3>
    <p>id:{{getData.id}}</p>
    <p>
      <span>name:</span>
    </p>
    <input type="text" class="input" v-model="curPeople.name" />
    <button @click="goBack">goback</button>
    <button @click="save(curPeople)">save</button>
    <messageLog />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import messageLog from "@/components/messageLog.vue";

@Component({
  components: {
    messageLog
  }
})
export default class heroDetail extends Vue {
  curPeople: object = {};

  private get getData(): any {
    this.curPeople = this.$store.getters.getData.filter(
      (x: any) => x.id == this.$route.params.id
    )[0];
    return this.curPeople;
  }

  public goBack() {
    this.$router.go(-1);
  }

  public save(curPeople: object) {
    this.$store.commit("EDICT_HERO", curPeople);
    this.$router.push({ path: "/heroes" });
  }

  mounted() {
    this.$store.commit("ADD_MESSAGE", "added hero id=" + this.$route.params.id);
  }
}
</script>

<style lang="less" scoped>
span {
  color: blueviolet;
  font-weight: bold;
}
.input {
  width: 50px;
  margin-bottom: 20px;
}
</style>