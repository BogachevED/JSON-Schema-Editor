/* eslint-disable vue/no-reserved-component-names */
import { createApp } from 'vue'
import { Store } from './components/storage/store'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ToggleButton from 'primevue/togglebutton'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import Sidebar from 'primevue/sidebar'
import TreeSelect from 'primevue/treeselect'
import InputNumber from 'primevue/inputnumber'
import 'primevue/resources/themes/own-theme/theme.css'//  theme (saga-blue/own-theme)
import 'primevue/resources/primevue.min.css'//  core css
import 'primeicons/primeicons.css'//  icons

const app = createApp(App)
app.use(PrimeVue)
app.use(ToastService)
app.use(Store)

app.component('Dialog', Dialog)
app.component('InputNumber', InputNumber)
app.component('TreeSelect', TreeSelect)
app.component('InputText', InputText)
app.component('Button', Button)
app.component('Toast', Toast)
app.component('ToggleButton', ToggleButton)
app.component('Dropdown', Dropdown)
app.component('Sidebar', Sidebar)

app.mount('#app')