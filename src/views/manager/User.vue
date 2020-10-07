<template>
  <div class="user">
    <div class="header">
      <van-uploader :after-read="afterRead" >
        <div class="photo">
          <img :src="waiter.imgPhoto" alt=""/>
        </div>
      </van-uploader>
      <div class="name">{{waiter.realname}}</div>
    </div>
    <van-cell icon="search" title="我的资料" is-link to="information"/>
    <van-cell icon="certificate" title="实名认证" is-link to="realname" />
    <van-cell icon="gold-coin-o" title="收入详情" :value="waiter.money" is-link to="income_list" />

    <br>
    <div class="btn" @click="logoutHandler">退出登录</div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import {get, post} from '../../http/axios';
export default {
  methods:{
    ...mapActions('user',['logout', 'FindWaiterById']),
    afterRead(file) {
      // let url = "http://121.199.29.84:8001/file/upload"

      // let photo = "http://121.199.29.84:8888/group1/"+response.data.id

      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    logoutHandler(){
      this.logout()
      .then(()=>{
        this.$router.push({path:'/login'})
      })
    }
  },
  computed:{
    ...mapState("user",["info", "waiter"])
  },
  created(){
    this.FindWaiterById(this.info.id);
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
  background: #fff;
  width: 100%;
  height: 100%;
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