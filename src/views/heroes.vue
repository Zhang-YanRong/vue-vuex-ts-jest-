<template>
  <div class="home">
    <p>My Heroes</p>Hero name:
    <input placeholder="请输入" v-model="searchData" />
    <button @click="addPeople">add</button>
    <ul class="peopleList">
      <li v-for="(item,i) in datas" :key="item.id" @click="goDetail(item.id)">
        <span>{{item.id}}</span>
        <span>{{item.name}}</span>
        <span @click.capture.stop="deleteHero(i)">X</span>
      </li>
    </ul>

    <messageLog />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import messageLog from "@/components/messageLog.vue";

interface GoDetail {
  path: string;
}

@Component({
  components: {
    messageLog
  }
})
export default class heroes extends Vue {
  searchData?: string = "";

  private get datas(): any {
    return this.$store.getters.getData;
  }

  addPeople() {
    this.$store.commit("ADD_HERO", {
      data: {
        name: this.searchData
      }
    });
  }

  deleteHero(i: number) {
    this.$store.commit("DELETE_HERO", {
      index: i
    });
  }

  goDetail(id: number) {
    let obj: GoDetail = {
      path: `/heroDetail/${id}`
    };
    this.$router.push(obj);
  }

  mounted() {
    this.$store.commit("ADD_MESSAGE", "fetched heroes");
  }
}
</script>
<style lang="less" scoped>
ul {
  width: 280px;
  height: auto;
  overflow: hidden;
  margin: 20px auto;
  box-sizing: border-box;
  border-radius: 3px;
  li {
    width: 200px;
    height: 30px;
    border: 1px solid #efefef;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 30px;
    text-align: center;
    box-sizing: border-box;
    border-radius: 3px;
    span {
      display: block;
    }
    & > span:nth-of-type(1) {
      background: #405061;
      color: #fff;
      width: 30px;
      height: 30px;
    }
    & > span:nth-of-type(2) {
      background: #eee;
      color: #333;
      width: 100%;
      height: 30px;
      flex: 1;
    }
    & > span:nth-of-type(3) {
      background: gray;
      color: #fff;
      width: 30px;
      height: 30px;
    }
  }
}
.peopleList > li:hover {
  transform: translateX(5px);
  transition: transform 0.5s;
}
</style>
