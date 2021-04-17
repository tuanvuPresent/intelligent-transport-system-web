import Vue from 'vue'
import Vuex from 'vuex'
import vehicle from './vehicle'
import display from './display'
import trackingVehicle from './trackingVehicle'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        vehicle,
        display,
        trackingVehicle,
    }
})
