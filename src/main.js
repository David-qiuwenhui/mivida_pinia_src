import { router } from "./routes";
import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// pinia
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();
// 使用vue-router
app.use(router);
// 使用ElementPlus
app.use(ElementPlus);
app.use(pinia);
// 使用element ui icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount("#app");
