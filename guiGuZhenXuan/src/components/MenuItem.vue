<script setup lang="ts">
import { defineProps } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
const props = defineProps<{
    menuList: Array<RouteRecordRaw>;
}>();
// console.log(props.menuList)
</script>

<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 无子路由 -->
        <template v-if="item.meta.selected">
            <el-menu-item v-if="!item.children" :index="item.path">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
            <!-- 仅单个子路由 -->
            <el-menu-item v-else-if="item.children && item.children.length === 1" :index="item.children[0].path">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
            <!-- 多个子路由  -->
            <el-sub-menu v-else :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <MenuItem v-if="item.children" :menuList="item.children">
                </MenuItem>
            </el-sub-menu>
        </template>
    </template>
</template>


<style scoped></style>