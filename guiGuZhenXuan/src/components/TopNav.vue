<script setup lang="ts">
import TopNavItem from './TopNavItem.vue';
import { FullScreen, Refresh, Setting } from '@element-plus/icons-vue';
import useHomePageStore from "@/store/modules/homePage";
import useUserStore from '@/store/modules/user';
import { useRoute, useRouter } from 'vue-router';
const doc = document; //给DOM对象别名才可以在模版中使用，否则无法识别


const homePageStore = useHomePageStore();
const updateRefresh = () => {
    homePageStore.refresh = !homePageStore.refresh
}

const getImageUrl = (imageName: string) => {
    // 使用 new URL 动态构建图片路径
    return new URL(`/src/assets/images/${imageName}`, import.meta.url).href;
};

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const logMeout = ()=>{
    userStore.logout();
    router.push({path:'/login',query:{redirect: `${route.path}`}});
}
</script>

<template>
    <div class="flex-design">
        <!-- 流式布局，左边面包屑，右边小控件，中间用一无作用的空盒子占位 -->
        <div class="nav-at-left">
            <TopNavItem></TopNavItem>
        </div>
        <div class="empty-grab-the-rest-space"></div>
        <div class="control-at-right">
            <el-button :icon="Refresh" circle @click="updateRefresh"></el-button>
            <el-button :icon="FullScreen" circle @click="!doc.fullscreenElement ? doc.documentElement.requestFullscreen() : doc.exitFullscreen()"></el-button>
            <el-button :icon="Setting" circle></el-button>
            <img :src="getImageUrl(userStore.avatar)" alt="avatar" style="width: 32px;
            height: 32px; border-radius: 20px; margin-left: 10px; overflow: hidden;">
            <el-dropdown class="horizontal-text style-dropdown">
                <span>
                    {{ userStore.username }}
                    <el-icon class="horizontal-tex">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logMeout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<style scoped lang="scss">
.flex-design {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 50px;
    border-bottom: 1px solid #545c64;

    .nav-at-left,
    .empty-grab-the-rest-space,
    .control-at-right {
        height: inherit;
        width: fit-content;
        flex-grow: 0;
        line-height: inherit;
    }

    .nav-at-left {
        margin-left: 20px;
    }

    .empty-grab-the-rest-space {
        flex-grow: 1;
        width: auto;
    }

    .horizontal-text {
        height: inherit;
        line-height: inherit;
    }

    .style-dropdown {
        cursor: pointer;
        margin-left: 10px;
        margin-right: 10px;
        align-items: center;
    }
}
</style>
