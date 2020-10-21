<template>
    <div class="realname">
        <wyq-fulllayout title="实名认证">
            <div class="header">
                <van-cell title="请上传身份证正面照" size="large" />
                <van-uploader :after-read="afterRead1" >
                    <div class="photo">
                        <img :src="photo1" alt=""/>
                    </div>
                </van-uploader>
                <van-cell title="请上传身份证反面照" size="large" />
                <van-uploader :after-read="afterRead2" >
                    <div class="photo">
                        <img :src="photo2" alt=""/>
                    </div>
                </van-uploader>
                <!-- 验证 -->
                <div class="btn" @click="RealnameHandler">
                    验证
                </div>
                <!-- 验证 --> 
            </div>
            
        </wyq-fulllayout>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import axios from 'axios'
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
    data() {
        return {
            photo1: '',
            photo2: '',
        }
    },
    computed: {
        ...mapState('user',['info', 'waiter']),
    },
    created() {
        this.loadidimg();
    },
    methods: {
        ...mapActions('user',['FindWaiterById', 'UpdateWaiter']),
        loadidimg(){
            this.FindWaiterById(this.info.id).then(()=>{
                this.photo1 = this.waiter.idcardPhotoPositive
                this.photo2 = this.waiter.idcardPhotoNegative
            })
        },
        // 身份证正面
        afterRead1(file) {
            this.uploadImg(file.file,1)
        },
        // 身份证背面
        afterRead2(file) {
            this.uploadImg(file.file,2)
        },
        // 上传图片到服务器
        uploadImg (file,whichphoto) {
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
                //res 为接口返回值
                if(whichphoto==1){
                    this.photo1 = "http://121.199.29.84:8888/group1/"+res.data.data.id
                    console.log(this.photo1);
                }else if(whichphoto==2){
                    this.photo2 = "http://121.199.29.84:8888/group1/"+res.data.data.id
                    console.log(this.photo2);
                }
            }).catch((response) => {})
        },
        // 实名验证
        RealnameHandler(){
            console.log(this.photo1);
            console.log(this.photo2);
            let params = this.waiter;
            params.idcardPhotoPositive = this.photo1;
            params.idcardPhotoNegative = this.photo2;
            this.UpdateWaiter(params)
            .then(res=>{
                // console.log(this.info.id)
                this.FindWaiterById(this.info.id).then(()=>{
                    this.$toast('上传成功');
                })
            })
        },
    }
}
</script>

<style scoped>
.header{
    text-align: center;
    margin-top: 50px ;
}
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
.photo {
    margin: 0 auto;
    width: 15em;
    height: 10em;
    box-sizing: border-box;
    /* border:1px solid #1659a0; */
    overflow:hidden;
    padding: 1em;
}
.header .photo img {
    background: #fff;
    background-image: url(../../assets/isnull.png);
    background-repeat: no-repeat;
    background-position: center;
    text-align: center;
    width: 100%;
    height: 100%;
}
</style>