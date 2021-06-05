import Vue from 'vue'
import Vuex from 'vuex'
import customAxios from './customAxios'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        vehicleLocaltionList: [],
        vehicleSelected : null,
        vehicleLocaltionParams : {minutes : 2},
        vehicleLocaltionHistory : {}, 
    },
    getters: {
        vehicleLocaltionList: state => {
            return state.vehicleLocaltionList
        },
        vehicleSelected: state => {
            return state.vehicleSelected
        },
        vehicleLocaltionParams: state => {
            return state.vehicleLocaltionParams
        },
        vehicleLocaltionHistory: state => {
            return state.vehicleLocaltionHistory
        }
    },
    mutations: {
        setVehicleLocaltionList (state, value) {
            state.vehicleLocaltionList = value
        },
        setVehicleSelected (state, value) {
            state.vehicleSelected = value
        },
        setVehicleLocaltionHistory (state, value) {
            state.vehicleLocaltionHistory = value
        }
    },
    actions: {
        getVehicleLocaltionList ({commit, state}, payload) {
            const loading = payload.loading
            const params = payload.params
            customAxios
                .get('api/v1/vehicles-localtion/', {params : params}, loading)
                .then(response => {
                    if (state.vehicleSelected){
                        let vehicleSelected = response.data.data.find((item)=> item.license_plate === state.vehicleSelected.license_plate)
                        commit('setVehicleSelected', vehicleSelected)
                    }
                    commit('setVehicleLocaltionList', response.data.data)     
                })
        },
        async getHistoryVehicleLocaltion({commit}, payload){
            const params = payload.params
            const id = payload.id
            customAxios
                .get('api/v1/vehicles-localtion/' + id + '/history/', {params : params})
                .then(response => {
                    commit('setVehicleLocaltionHistory', response.data.data)    
                })
        },
        setVehicleLocaltionHistory ({commit}, value) {
            commit('setVehicleLocaltionHistory', value)
        },
        setVehicleSelected ({commit}, value) {
            commit('setVehicleSelected', value)
        }
    },
    modules: {}
}
