import { defineStore } from "pinia";
import { ref } from "vue";

const useHomePageStore = defineStore("homePage", () => {
  const refresh = ref<boolean>(false); // 导航右侧刷新按钮效果 
  return { refresh };
});

export default useHomePageStore;
