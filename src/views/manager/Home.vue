<template>
  <div class="home">
    <van-nav-bar title="主页"/>
    <header class="header">
    <!-- <van-image
      width="350"
      height="200"
      src="../../assets/images/home_10.jpg"
    />     -->

      <img src="../../assets/home.jpg" alt="">
    </header>
    <!-- 内容区域 -->
    <div>
      <!-- 订单n个 -->
      <wyq-order-item 
      v-for="o in orders"
      :key="o.id" :data="o">
      </wyq-order-item>
    </div>
    <div class="ordernull" v-if="orders.length==0&&orders1.length==0">
      <van-empty description="暂无可接订单和待完成服务" />
    </div>
    <div>
      <!-- 订单n个 -->
      <wyq-order-item 
      v-for="o in orders1"
      :key="o.id" :data="o">
      </wyq-order-item>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {get, post} from '../../http/axios';
export default {
  data(){
    return {
      categories:[],
      orders:[],
      orders1:[]
    }
  },
  computed:{
    ...mapState("user",["info"])
  },
  created(){
    // 查询订单
    this.loadorders();
  },
  methods:{
    // 加载待接单信息
    loadorders(){
      let url = "/order/query"
      let params={
        waiterId:this.info.id,
        status:"待接单"
      }
      get(url,params).then((response)=>{
        this.orders=response.data;
      })
      let params1={
        waiterId:this.info.id,
        status:"待服务"
      }
      get(url,params1).then((response)=>{
        this.orders1=response.data;
      })
    }
  }
}
</script>
<style scoped>
.home {
  padding-bottom: 50px;
}
.header {
  height: 260px;
  overflow: hidden;
}
.header img {
  width: 100%;
}
</style>