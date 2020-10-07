<template>
  <div class="order_item">
    <van-row class="header"> 
      <van-col span="12">订单编号: {{data.id}}</van-col>
      <van-col span="12" class="status">{{data.status}}</van-col>
    </van-row>
    <van-row>
      <div style="padding-left:10px">服务内容:</div>
      <span v-for="line in data.orderLines" :key="line.id">
          <van-card :num=line.number :price=line.product.price :desc=line.product.description
          :title=line.product.name :thumb=line.product.photo />
          <!-- {{line.product.name}} -->
      </span>
      <van-col :span="24" :offset="1">
        <div>顾客姓名：{{data.customer.realname}}</div>
        <div>顾客联系方式：{{data.customer.telephone}}</div>
        <div>下单时间：{{data.orderTime | datefmt}}</div>
        <div>地址：
          {{data.address.province}}
          {{data.address.city}}
          {{data.address.area}}
          {{data.address.address}}
        </div>
      </van-col>
    </van-row><br>
    <div class="text-right">
      总额￥ {{data.total}}
    </div>
    
    <div class="text-right" v-if="data.status==='待接单'"><br>
        <van-button size="small" type="warning" plain 
        @click="rejectHandler(data.id)">拒绝</van-button>&nbsp;
        <van-button size="small" type="primary" plain 
        @click="acceptHandler(data)">接受</van-button><br>
    </div>
    <div class="text-right" v-if="data.status==='待服务'"><br>
        <van-button size="small" type="primary" plain 
        @click="finishHandler(data.id)">完成服务</van-button>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant';
import {get} from '../http/axios';
export default {
  props:{
    data:{type:Object}
  },
  methods:{
      finishHandler(id){
        let url = "/order/serviceCompleteOrder";
        let params={
          orderId:id
        }
        get(url,params).then(()=>{
          this.$toast("服务完成，请等待顾客确认");
          this.$router.go(0);
        })
      },
      acceptHandler(data){
        let url = "/order/takeOrder";
        let params={
          waiterId: data.waiterId,
          orderId: data.id,
        }
        if(data.waiter.status!="禁用"){
          get(url,params).then(()=>{
            this.$toast("接单成功，请尽快服务");
            this.$router.go(0);
          })
        }else{
          Dialog({ message: '请先完成实名制' })
        }
        
      },
      rejectHandler(id){
        let url = "/order/rejectOrder";
        let params={
            orderId:id
        }
        get(url,params).then(()=>{
          this.$toast("拒绝成功");
          this.$router.go(0);
        })
      }
  }
}
</script>
<style scoped>
.order_item {
  margin: .5em 1em;
  padding: .5em;
  border-radius: 5px;
  background: #ffffff;
}
.order_item .header {
  line-height: 2.5em;
  font-size: 14px;
}
.order_item .header .status {
  text-align: right;
  font-size: 12px;
  color: #fd621f;
}
.order_item img {
  width: 100%;
  border-radius: 3px;
}


</style>