<script setup lang="ts">
import LeftMenu from "@/components/HomeLeftMenu.vue"
import TopNav from "@/components/TopNav.vue";
import { computed, ref } from "vue";
import MainContent from "./MainContent.vue";

const isCollapse = ref(false)
const isSmallScreen = ref(false)
const leftMenuWidth = computed(() => {
    return isCollapse.value ? '100px' : '300px'
})
const topNavHeight = '50px';
const SmallScreenLeftWidth = '70px'
const homePageHeight = '100vh';
// console.log(userStore.menuRoutes[0])
</script>

<template>
    <div class="home-container" :style="{ 'height': homePageHeight }" max-height="100vh">
        <!-- 左侧菜单 -->
        <el-scrollbar class="left-menu" :style="{ 'width': isSmallScreen ? SmallScreenLeftWidth : leftMenuWidth, }">
            <LeftMenu
                @toggleCollapse="(clapV: boolean, smallV: boolean) => [isCollapse, isSmallScreen] = [clapV, smallV]">
            </LeftMenu>
        </el-scrollbar>
        <div class="right-content-box"
            :style="{ 'width': isSmallScreen ? `calc(100% - ${SmallScreenLeftWidth})` : `calc(100% - ${leftMenuWidth})`, 'left': isSmallScreen ? SmallScreenLeftWidth : leftMenuWidth, 'height': homePageHeight }">
            <!-- 顶部导航 -->
            <TopNav class="top-nav" :style="{ 'height': topNavHeight, }"></TopNav>
            <!-- 右侧内容 -->
            <el-scrollbar class="my-scrollbar" :style="{ 'height': `calc(100vh - ${topNavHeight})` }">
                <main>
                    <!-- <router-view class="main-content"></router-view> -->
                     <MainContent></MainContent>
                </main>
            </el-scrollbar>
        </div>
    </div>
</template>

<style scoped lang="scss">
.home-container {
    position: relative;
    width: 100%;
    background-color: white;

    .left-menu {
        // border-right: 1px solid #e4e7ed;
        transition: width 0.5s ease-in-out;
        background-color: $left-menu-color;
    }

    .right-content-box {
        position: absolute;
        top: 0;
        transition: left 0.5s ease-in-out;
    }

    .top-nav {
        width: 100%;
    }

    .my-scrollbar {
        width: 100%;
        //注意！这个bgc不能删除！
        background-color: white;
    }
}
</style>