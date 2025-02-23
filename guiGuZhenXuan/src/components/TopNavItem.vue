<script setup lang="ts">
import { useRoute } from "vue-router";
import { ArrowRight } from '@element-plus/icons-vue';

const nowRoute = useRoute();
// console.log(nowRoute.matched)
</script>

<template>
    <el-breadcrumb :separator-icon="ArrowRight" class="horizontal-text">
        <template v-for="item in nowRoute.matched" :key="item.path" >
            <el-breadcrumb-item :to="{ path: item.path }" v-if="item.meta.title">
                <el-icon size="large">
                    <component :is="item.meta.icon"></component>
                </el-icon>
                {{ item.meta.title }}
            </el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>


<style scoped lang="scss">

.horizontal-text {
    height: inherit;
    line-height: inherit;
}
</style>