<template>
  <div>
    <p>Top Heroes</p>
    <ul class="Top">
      <li v-for="(item,i) in datas" :key="i + 'g'" @click="goDetail(item.id)">{{item.name}}</li>
    </ul>
    <p>Hero Search</p>
    <div class="search">
      <input placeholder="请输入" style="width:200px;box-sizing:border-box;" v-model="searchData" />
      <ul class="searchBox">
        <li v-for="item in searcResult" :key="item.id" @click="goDetail(item.id)">{{item.name}}</li>
      </ul>
    </div>

    <messageLog />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import messageLog from "@/components/messageLog.vue";

interface Msg {
  msg: string;
}

interface Throttle {
  only: string;
  fn?: Function | number;
}

@Component({
  components: {
    messageLog
  }
})
export default class dashboard extends Vue {
  @Prop() private msg!: Msg["msg"];

  private searchData?: string = "";
  private throttle!: number;
  private searcResult?: object[] = [];

  @Watch("searchData", { immediate: true, deep: true })
  onSearchDataChange(val: string, oldVal: string) {
    if (!val.length) return;
    this.searchData = val;
    clearTimeout(this.throttle);
    this.throttle = this.createThrottle(val, this.searchData, this.search);
  }

  public createThrottle(val: string, searchData: string, call: Function) {
    return setTimeout(() => {
      if (searchData === val) {
        call(searchData);
      }
    }, 1000);
  }

  public goDetail(id: number) {
    this.$router.push({
      path: `/heroDetail/${id}`
    });
  }

  private get datas() {
    //方法一：
    const arr: object[] = this.$store.getters.getData || [];
    return arr.filter((v: object, i: number) => i > 0 && i < 5);

    // //方法二：
    // const { getData = [] } = this.$store.getters();
    // getData.filter((v: object, i: number) => i > 0 && i < 5);

    // //方法三：
    // const arrs: any = async (): Promise<{}> => {
    //   return await this.$store.getters.getData;
    // };
    // return arrs.then((res: object[]): object[] => {
    //   return res.filter((v: object, i: number) => i > 0 && i < 5);
    // });

    // //方法四：
    // return this.$store.getters.getTop;
  }

  public search(searchData: string): any {
    let reg: RegExp = new RegExp(`^${searchData}`, "i");
    this.searcResult = this.$store.getters.getData.filter((v: any, i: number) =>
      reg.test(v.name)
    );
    return this.searcResult;
  }

  mounted() {
    this.$nextTick(function() {
      this.$store.commit("ADD_MESSAGE", "fetched heroes");
    });
  }

  destroyed() {
    clearTimeout(this.throttle);
  }
}
</script>
<style scoped lang="less">
.Top {
  width: 600px;
  height: 100px;
  margin: 50px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  li {
    width: 100px;
    height: 100px;
    background: #607d8b;
    color: #fff;
    text-align: center;
    line-height: 100px;
    font-size: 20px !important;
    font-weight: bold;
    font-size: 12px;
  }
}
.Top > li:hover {
  background: #efefef;
  color: #607d8b;
}

.search {
  width: 200px;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
  .searchBox {
    width: 100%;
    height: auto;
    overflow: hidden;
    li {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #999;
      height: 20px;
      line-height: 20px;
      text-align: left;
      border-top: 0 solid #999;
    }
  }
}
</style>