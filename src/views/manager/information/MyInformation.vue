<template>
  <div>
    <!-- 顶部导航栏 -->
    <wyq-fulllayout title="我的资料">
    <!-- /顶部导航栏 -->
      <van-row>
        <van-col :span="12">
          <div class="income">
            <div class="income_one">总收益金额</div>
            <div class="income_two">{{IncomeTotal}} 元</div>
          </div>
        </van-col>
        <van-col :span="12">
          <div class="income">
            <div class="income_one">还可提现</div>
            <div class="income_two">{{waiter.money}} 元</div>
          </div>
        </van-col>
      </van-row>
    <!-- /佣金余额 -->
    <!-- 员工信息 -->
    <van-cell-group>
      <van-field
        :readonly="true"
        v-model="waiter.username"
        label="会员名"
        left-icon="smile-o"
        placeholder="请输入账号"
      />
      <van-field
        v-model="waiter.realname"
        clearable
        label="真实姓名"
        left-icon="user-o"
        placeholder="请输入姓名"
      />
      <van-field
        v-model="waiter.telephone"
        clearable
        label="联系方式"
        left-icon="phone-o"
        placeholder="请输入联系方式"
      />
      <van-field
        v-model="waiter.idCard"
        clearable
        label="身份证号"
        left-icon="idcard"
        placeholder="请输入身份证号"
      />
      <van-field
        v-model="waiter.bankCard"
        clearable
        label="银行卡号"
        left-icon="ecard-pay"
        placeholder="请输入银行卡号"
      />
    </van-cell-group>
    <van-cell-group>
      <van-row>
        <!-- <van-col :span="12"> -->
          <van-field
            v-model="waiter.province"
            label="省"
            left-icon="location-o"
            placeholder="省份"
          />
        <!-- </van-col>
        <van-col :span="6"> -->
          <van-field
            v-model="waiter.city"
            label="市"
            left-icon="location-o"
            placeholder="城市"
          />
        <!-- </van-col>
        <van-col :span="6"> -->
          <van-field
            v-model="waiter.area"
            label="县"
            left-icon="location-o"
            placeholder="区域"
          />
        <!-- </van-col> -->
      </van-row>
    </van-cell-group>
    <!-- /员工信息 -->
    <div class="btn" @click="SaveWaiterHandler">
        修改
    </div>
    <!-- {{earn}} -->
    <!-- {{waiter}} -->
    </wyq-fulllayout>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import {mapActions,mapGetters,mapState} from 'vuex'
export default {
  data() {
    return {
  
    }
  },
  created() {
    this.EarningWaiter(this.info.id)
    // 员工详细信息
    // console.log(this.info.id)
    this.FindWaiterById(this.info.id)
  },
  computed: {
    ...mapState('user',['info','earn','waiter']),
    ...mapGetters('user',['IncomeTotal'])
  },
  methods: {
    ...mapActions('user',['EarningWaiter','FindWaiterById','UpdateWaiter']),
    // 修改员工信息
    SaveWaiterHandler(){
      this.params=this.waiter
      this.params.province=this.waiter.province
      this.params.city=this.waiter.city
      this.params.area=this.waiter.area
      this.params.bankCard=this.waiter.bankCard
      this.params.idCard=this.waiter.idCard
      this.params.telephone=this.waiter.telephone
      this.params.realname=this.waiter.realname
      // console.log(this.params)
      this.UpdateWaiter(this.params)
      .then(res=>{
        Dialog({ message: "修改成功" })
        // console.log(this.info.id)
        this.FindWaiterById(this.info.id)
      })
    },
  }
}
</script>

<style scoped>
.btn {
  background-color: #ededed;
  width: 90%;
  margin: 2em auto;
  line-height: 3em;
  text-align: center;
  border: 1px solid #ededed;
  border-radius: 1.5em;
  font-size: 14px;
}
.income_one{
  font-size: 18px;
}
.income{
  background: orange;
  padding: 1em;
  text-align: center;
  color: #fff;
  border: 1px solid #fff;
  margin-top: 40px;
}
.header {
  height: 300px;
  overflow: hidden;
}
.header img {
  width: 100%;
}
</style>