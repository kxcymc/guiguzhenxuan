<script setup lang="ts">
const { iconName, color, height, width } = defineProps({
    iconName: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: '16px',
    },
    height: {
        type: String,
        default: '16px',
    }
})
</script>

<template>
    <!-- 测试SVG图标使用 -->
    <!-- SVG：图标外层容器节点，内部需要与use标签结合使用 -->
    <svg :style="{
        height,
        width
    }">
        <!-- xlink:href执行用哪一个图标，属性值务必#icon-图标名字 -->
        <!-- 使用fill更改图标元素，假如无法改变默认颜色，在图标的svg文件里修改颜色属性 -->
        <!-- 如使用的like，live的svg源代码里存在fill属性，更改其属性名为current-color即可 -->
        <use :href="'#icon-' + iconName" :fill="color"></use>
    </svg>
</template>

<style scoped></style>