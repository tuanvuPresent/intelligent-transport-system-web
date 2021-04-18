import Vue from 'vue'
import Vuex from 'vuex'
import customAxios from './customAxios'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        vehicleLocaltionList: []
    },
    getters: {
        vehicleLocaltionList: state => {
            return state.vehicleLocaltionList
        }
    },
    mutations: {
        setVehicleLocaltionList (state, value) {
            state.vehicleLocaltionList = value
        }
    },
    actions: {
        getVehicleLocaltionList ({commit}, loading=true) {
            customAxios
                .get('api/v1/vehicles-localtion/', {}, loading)
                .then(response => {
                    commit('setVehicleLocaltionList', response.data.data)      
                })
        }
    },
    modules: {}
}
