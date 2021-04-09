import Vue from 'vue'
import Vuex from 'vuex'
import vehicle from './vehicle'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        vehicle,
    }
})
