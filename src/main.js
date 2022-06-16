import { createApp } from 'vue'
import App from './App.vue'
import BaseButton from './components/UI/BaseButton.vue';
import BaseForeground from './components/UI/BaseForeground.vue'

const app = createApp(App)

app.component("base-button", BaseButton);
app.component("base-foreground", BaseForeground);

app.mount('#app');
