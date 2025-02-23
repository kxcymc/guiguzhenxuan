<script setup lang="ts">
import useHomePageStore from "@/store/modules/homePage";
import { watch, ref, type Ref, } from "vue";
const refresh = ref(true);
const homePageStore = useHomePageStore();
watch(() => homePageStore.refresh as Ref<boolean>,
    () => {
        refresh.value = false
        // nextTick(() => refresh.value = true)
        setTimeout(() => {
            refresh.value = true;
        }, 120);
    })
</script>

<template>
    <router-view v-slot="{ Component, route }" class="main-content">
        <transition name="slide-fade">
            <component :is="Component" v-if="refresh" :key="route.path" />
        </transition>
    </router-view>
</template>

<style scoped lang='scss'>
.main-content {
    padding: 20px;

    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }
}
</style>