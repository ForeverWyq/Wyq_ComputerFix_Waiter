<template>
  <div class="user">
    <div class="header">
      <div class="photo">
        <img :src="waiter.imgPhoto" alt />
      </div>
      <div class="name">{{waiter.realname}}</div>
    </div>
    <van-cell title="我的收入" is-link to=""/>
    <van-cell title="收入详情" is-link to="" />
    <van-cell title="提现申请" is-link to="" />

    <br>
    <div class="btn" @click="logoutHandler">退出登录</div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import {get, post} from '../../http/axios';
export default {
  data(){
    return {
      waiter:[],
    }
  },
  computed:{
    ...mapState("user",["info"])
  },
  methods:{
    ...mapActions('user',['logout']),
    loadrealname(){
      let url = "/waiter/findWaiterById"
      let params={
        id: this.info.id,
      }
      get(url,params).then((response)=>{
        this.waiter=response.data;
      })
    },
    logoutHandler(){
      this.logout()
      .then(()=>{
        this.$router.push({path:'/login'})
      })
    }
  },
  created(){
    this.loadrealname();
  },
}
</script>
<style scoped>
.header {
  padding-top: 46px;
  text-align: center;
  background: #1659a0;
  margin-bottom: 2em;
}

.header .photo {
  margin: 0 auto;
  width: 10em;
  height: 10em;
  border-radius: 50%;
  box-sizing: border-box;
  border:1px solid #1659a0;
  overflow:hidden;
  padding: 1em;
}
.header .name {
  line-height: 3em;
  font-size: 16px;
  color: #ffffff;

}
.header .photo img {
 width: 100%;
 border-radius: 50%;
}

.btn {
  width: 90%;
  margin: 0 auto;
  line-height: 3em;
  text-align: center;
  border: 1px solid #ededed;
  border-radius: 1.5em;
  color: #f00;
}
</style>