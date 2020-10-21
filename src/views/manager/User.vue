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
import axios from 'axios'
export default {
  methods:{
    ...mapActions('user',['logout', 'FindWaiterById', 'UpdateWaiter']),

    // 更换头像
    afterRead(file) {
      // let url = "http://121.199.29.84:8001/file/upload"
      console.log(file);
      // 此时可以自行将文件上传至服务器
      this.uploadImg(file.file)
    },
    // 上传图片到服务器
    uploadImg (file) {
    // 创建form对象
      let formdata = new FormData();
      // 通过append向form对象添加数据,可以通过append继续添加数据
      //或formdata.append('file',file);
      formdata.append('file', file, file.name);
      //设置请求头
      let config = {
          headers:{
              'Content-Type':'multipart/form-data'
          }
      };  
      //this.axios 是因为在main.js写在vue实例里
      const axiosAjax = axios.create({
          timeout: 1000 * 60, //时间
          withCredentials: true //跨域携带cookie
      });
      axiosAjax.post('http://121.199.29.84:8001/file/upload',formdata,config)
      .then((res)=>{   //这里的url为后端接口
          console.log(res.data.data.id);
          //res 为接口返回值
          let photo = "http://121.199.29.84:8888/group1/"+res.data.data.id
          console.log(photo);
          let params = this.waiter;
          params.imgPhoto = photo;
          this.UpdateWaiter(params)
          .then(res=>{
            // console.log(this.info.id)
            this.FindWaiterById(this.info.id).then(()=>{
              this.$toast('更换成功');
            })
          })
      }).catch((response) => {})
    },

    // 退出登录
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