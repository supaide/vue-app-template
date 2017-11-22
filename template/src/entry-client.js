import Vue from 'vue'
import {createApp} from './app'
import 'mint-ui/lib/style.css'

const { app, router} = createApp()

router.onReady(() => {
  app.$mount('#app')
})
