import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { VuesticPlugin } from "vuestic-ui";
import "vuestic-ui/dist/vuestic-ui.css";
import router from "./router";

const app = createApp(App);
app.use(VuesticPlugin);
app.use(router);
app.mount("#app");
