import SvgIcon from "@/components/globalComponents/SvgIcon.vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allComp = { SvgIcon, ...ElementPlusIconsVue };
export default {
  //这个方法名必须为install
  install(app) {
    Object.keys(allComp).forEach((item) => {
      app.component(item, allComp[item]);
    });
  },
};
