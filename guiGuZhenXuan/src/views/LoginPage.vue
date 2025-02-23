<script setup lang="ts">
import { User, Lock, } from '@element-plus/icons-vue'
import { ref } from 'vue'
import useUserStore from "@/store/modules/user.ts"
import { useRoute, useRouter } from 'vue-router'
import { ElNotification, ElMessage } from 'element-plus'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
interface ruleForm {
    username: string,
    password: string
}
const formSize = ref<ComponentSize>('default')
const loginFormRef = ref<FormInstance>()
const loginForm = ref<ruleForm>({
    username: 'admin',
    password: '111111'
})

const validateUsername = (rule, value, callback) => {
    if (value.length >= 5) {
        callback();
    } else {
        callback(new Error("用户名必须大于4位"))
    }
}
const validatePassword = (rule, value, callback) => {
    if (value.length >= 6) {
        callback();
    } else {
        callback(new Error("密码必须大于5位"))
    }
}
const rules = ref<FormRules<ruleForm>>({
    username: [
        // { required: true, min: 5, message: "用户名必须大于5位", trigger: "change" }
        { required: true, validator: validateUsername, trigger: "change" }
    ],
    password: [
        // { required: true, min: 6, message: "密码必须大于6位", trigger: "change" }
        { required: true, validator: validatePassword, trigger: "change" }
    ],
})

const getTime = () => {
    let message = '';
    const hours = new Date().getHours();
    if (hours <= 9) {
        message = '早上';
    } else if (hours <= 12) {
        message = '上午';
    } else if (hours <= 18) {
        message = '下午';
    } else {
        message = '晚上';
    }
    return message
}

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const loginBtn = ref(false);
const login = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            try {
                loginBtn.value = true;
                await userStore.login(loginForm.value);
                if (route.query.redirect) router.push(route.query.redirect as string);
                else router.push('/');
                ElNotification({
                    type: 'success',
                    message: "欢迎回来",
                    title: `Hi,${getTime()}好`
                })
            } catch (error) {
                console.log(error);
                ElMessage({
                    type: 'error',
                    message: error.message
                })
            } finally {
                loginBtn.value = false;
            }
        } else {
            // console.log("不合法的输入！", fields)
            ElMessage({
                type: 'error',
                message: "输入格式错误！请重新输入"
            })
            formEl.resetFields();
        }
    })
}


</script>

<template>
    <div class="login_container">
        <el-row>
            <!-- 左侧占位盒子 -->
            <el-col :span="12" :xs="0"></el-col>
            <!-- 右侧登录表单 -->
            <el-col :span="12" :xs="24">
                <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="rules" label-width="auto"
                    :size="formSize">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="default" class="login_btn" @click="login(loginFormRef)"
                            :loading="loginBtn">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url(@/assets/images/background.jpg) no-repeat center/cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url(@/assets/images/login_form.png) no-repeat center/cover;
        border-radius: 30px;
        padding: 40px;

        h1,
        h2 {
            color: white;
            font-size: 40px;
        }

        h2 {
            font-size: 24px;
            margin: 12px 0;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>