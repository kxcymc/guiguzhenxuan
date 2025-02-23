<template>
    <div class="flex items-center mb-4">
        <el-radio-group v-model="size" class="mr-4">
            <el-radio-button value="default">default</el-radio-button>
            <el-radio-button value="large">large</el-radio-button>

            <el-radio-button value="small">small</el-radio-button>
        </el-radio-group>
        <div>
            background:
            <el-switch v-model="background" class="ml-2" />
        </div>
        <div class="ml-4">
            disabled: <el-switch v-model="disabled" class="ml-2" />
        </div>
    </div>

    <hr class="my-4" />

    <div class="demo-pagination-block">
        <div class="demonstration">Total item count</div>
        <el-pagination v-model:current-page="currentPage1" :page-size="100" :size="size" :disabled="disabled"
            :background="background" layout="total, prev, pager, next" :total="1000" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
    
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { ComponentSize } from 'element-plus'
const currentPage1 = ref(5)

const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
</script>

<style scoped>
.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
</style>