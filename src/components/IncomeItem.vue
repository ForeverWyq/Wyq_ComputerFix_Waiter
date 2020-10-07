<template>
  <div class="income_item">
    <van-panel class="incomeitem" v-for="e in data" :key="e.id">
      <!-- {{e}} -->
      <van-row>
        <van-col :span="4" style="text-align:center"><van-icon name="balance-o" /></van-col>
        <van-col :span="10">收益： {{e.money}} 元</van-col>
      </van-row>
      <van-row>
        <van-col :span="4" style="text-align:center"><van-icon name="clock-o" /></van-col>
        <van-col :span="20">收益时间：{{e.transactionTime | datefmt}}</van-col>
      </van-row>
      <van-row>
        <van-col :span="4" style="text-align:center"><van-icon name="comment-o" /></van-col>
        <van-col :span="20">
          收益描述：{{e.description}}
        </van-col>
        </van-row>
        <van-row>
          <van-col :span="4" style="text-align:center"><van-icon name="user-o" /></van-col>
          <van-col :span="20">服务对象： {{e.userId}}</van-col>
        </van-row> 
      </van-panel>
    <br>
    <!-- <div class="text-right">
        <van-button size="small" type="primary" plain 
        @click="acceptHandler(data)">详情</van-button>
    </div><br> -->
  </div>
</template>
<script>
export default {
  props:['data'],
}
</script>
<style scoped>
.income_item {
  margin: .5em 1em;
  padding: .5em;
  border-radius: 5px;
  background: #ffffff;
}
.income_item .incomeitem {
  line-height: 1.5em;
  font-size: 14px;
  background: #f8f8f8;
}
</style>