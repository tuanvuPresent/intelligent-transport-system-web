import Vue from 'vue'
import Vuex from 'vuex'
import customAxios from './customAxios'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        vehicleLocaltionList: [],
        vehicleSelected : null
    },
    getters: {
        vehicleLocaltionList: state => {
            return state.vehicleLocaltionList
        },
        vehicleSelected: state => {
            return state.vehicleSelected
        }
    },
    mutations: {
        setVehicleLocaltionList (state, value) {
            state.vehicleLocaltionList = value
        },
        setVehicleSelected (state, value) {
            state.vehicleSelected = value
        }
    },
    actions: {
        getVehicleLocaltionList ({commit, state}, loading=true) {
            customAxios
                .get('api/v1/vehicles-localtion/', {}, loading)
                .then(response => {
                    if (state.vehicleSelected){
                        let vehicleSelected = response.data.data.find((item)=> item.license_plate === state.vehicleSelected.license_plate)
                        commit('setVehicleSelected', vehicleSelected)
                    }
                    commit('setVehicleLocaltionList', response.data.data)      
                })
        },
        setVehicleSelected ({commit}, value) {
            commit('setVehicleSelected', value)
        }
    },
    modules: {}
}
