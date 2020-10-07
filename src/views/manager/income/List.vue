<template>
    <div class="income_list">
        <wyq-fulllayout title="收入列表">
            <div class="header">
                <van-row>
                    <van-col :span="4" style="text-align:center"><van-icon name="balance-o" /></van-col>
                    <van-col :span="14">
                        收益总金额：{{IncomeTotal}}  元<br>
                        可提现金额：{{waiter.money}} 元
                    </van-col>
                    <van-col :span="6">
                        <van-button size="small" type="warning" plain @click="WithdrawHandler()">提现</van-button>
                    </van-col>
                </van-row>
                <wyq-income-item :data="earn"/>
            </div>
        </wyq-fulllayout>
    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex' 
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState('user',['info','earn','waiter']),
        ...mapGetters('user',['IncomeTotal'])
    },
    created() {
        this.FindWaiterById(this.info.id)
        this.EarningWaiter(this.info.id)
    },
    methods: {
        ...mapActions('user',['EarningWaiter','FindWaiterById']),
        // 提现
        WithdrawHandler(){
            this.$router.push({path:'./withdraw'})
        },
    }
}
</script>
<style scoped>
.header{
    margin-top: 60px;
}
</style>