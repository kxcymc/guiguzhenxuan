<template>
    <div class="top-logo-collapse">
        <div class="logo" :style="{ 'width': isCollapse ? '50px' : '200px' }">
            <img src="../assets/images/logo.png" style="height: 44px;
            width: 44px;" alt="">
            <span v-show="!isCollapse">硅谷甄选平台</span>
        </div>
        <div class="collapse" v-show="!isSmallScreen">
            <el-tooltip class="box-item" effect="dark" :content="isCollapse ? '展开侧栏' : '折叠侧栏'" placement="bottom-end">
                <el-button @click.stop="toggleCollapse" size='small' style="border-radius: 6px;">
                    <SvgIcon :icon-name="'menu'" />
                </el-button>
            </el-tooltip>
        </div>
    </div>
    <el-menu :default-active="nowRoute.path" class="el-menu-vertical-demo" :collapse="isCollapse"
        active-text-color="#ffd04b" background-color="#545c64" text-color="#fff" unique-opened="true" :router="true">
        <MenuItem :menuList>
        </MenuItem>
    </el-menu>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref, watch, computed, defineEmits } from 'vue'
import { useMediaQuery } from '@vueuse/core';
import MenuItem from './MenuItem.vue';
import useUserStore from '@/store/modules/user'

// 获取页面当前路由
const nowRoute = useRoute();

// 使用 useMediaQuery 监听屏幕宽度
const isSmallScreen = useMediaQuery('(max-width: 768px)');

// 初始化侧栏折叠状态
const isCollapse = ref(false);
const userStore = useUserStore();
const menuList = computed(() => {
    return userStore.menuRoutes.filter(item => item.meta.selected);
})

// 监听屏幕尺寸变化，更新侧栏折叠状态
// 禁止 watchEffect!会导致手动折叠展开失效！
const emit = defineEmits(['toggleCollapse']);
watch(() => isSmallScreen.value,
    (value: boolean) => {
        isCollapse.value = value;
        emit('toggleCollapse', isCollapse.value, isSmallScreen.value);
    }, { immediate: true });
// 手动展开或折叠菜单
const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value;
    emit('toggleCollapse', isCollapse.value, false);
};
</script>

<style lang="scss" scoped>
.top-logo-collapse {
    display: flex;
    position: relative;
    height: 50px;
    padding-left: 5px;
    align-items: center;

    .logo {
        width: 50px;
        flex-grow: 0;
        display: flex;
        align-items: center;

        span {
            padding-left: 10px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 24px;
            color: white;
            white-space: nowrap;
            font-weight: bold;
        }
    }

    .collapse {
        flex-grow: 1;
        text-align: right;
        padding: 10px 5px 10px 5px;
    }
}

.el-menu-vertical-demo {
    will-change: width;
    border: none;
    width: inherit;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 400px;
}
</style>