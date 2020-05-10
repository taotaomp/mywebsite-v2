<template>
  <div id="appContainer" :style="'background: url('+bingPicSrc+')'">
    <!--图片版权信息-->
    <div id="imgCopyright">
      <span>{{bingPicCopyright}}</span>
    </div>
    <!--登陆框-->
    <div id="loginBox">
      <!--头像框-->
      <div id="avaterBox">
        <img src="@/assets/myava.jpg" />
      </div>
      <h3 align="center">告诉我你是谁好吗</h3>
      <!--表单-->
      <div id="loginForm">
        <el-form ref="loginForm" status-icon v-model="userLoginForm" :rules="userLoginFormRules">
          <el-form-item label="用户名" label-width="65px" prop="username">
            <el-input v-model="userLoginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="65px" prop="password">
            <el-input v-model="userLoginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="submitForm()">起飞</el-button>
            <el-button type="info" @click="resetForm()">诶，还没飞呢</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getBingPic,getToken } from '@/api/Login'
import client from '@/clientConfig/client'

export default {
  name: 'Login',
  data() {
    return {
      bingPicSrc: '',
      bingPicCopyright: '',
      userLoginForm: {},
      userLoginFormRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      }
    }
  },
  created() {
    this.getBingPic()
  },
  methods: {
    getBingPic() {
      getBingPic().then(res => {
        this.bingPicSrc = res.data.data.url
        this.bingPicCopyright = res.data.data.copyright
      })
    },
    submitForm(){
      this.$refs.userLoginFormRules.validate(valid =>{
        getToken({

        }).then
      });
    },
    resetForm() {
      this.userLoginForm = {}
    }
  }
}
</script>

<style>
#appContainer {
  background-size: 100%;
  height: 100%;
}
#imgCopyright {
  position: absolute;
  left: 50%;
  top: 95%;
  transform: translate(-50%, 0%);
  background-color: white;
  opacity: 70%;
  border-radius: 3px;
}
#loginBox {
  width: 450px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: white;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  opacity: 93%;
}
#loginBox h3{
  position: absolute;
  left: 50%;
  top: 23%;
  transform: translate(-50%, -50%);
}
#avaterBox {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
#avaterBox img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
#loginForm {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>