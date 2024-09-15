import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ToggleButton from 'primevue/togglebutton'
import Dialog from 'primevue/dialog'
import Select from 'primevue/select'
import Drawer from 'primevue/drawer'
import TreeSelect from 'primevue/treeselect'
import InputNumber from 'primevue/inputnumber'

import Store from './store/'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: {
      ...Aura,
      semantic: {
        ...Aura.semantic,
        primary: {
          50: '{blue.50}',
          100: '{blue.100}',
          200: '{blue.200}',
          300: '{blue.300}',
          400: '{blue.400}',
          500: '{blue.500}',
          600: '{blue.600}',
          700: '{blue.700}',
          800: '{blue.800}',
          900: '{blue.900}',
          950: '{blue.950}'
        }
      }
    }
  }
})
app.use(ToastService)
app.use(Store)

app.component('v-Button', Button)
app.component('v-InputText', InputText)
app.component('v-Toast', Toast)
app.component('v-ToggleButton', ToggleButton)
app.component('v-Dialog', Dialog)
app.component('v-Select', Select)
app.component('v-Drawer', Drawer)
app.component('v-TreeSelect', TreeSelect)
app.component('v-InputNumber', InputNumber)

app.mount('#app')
