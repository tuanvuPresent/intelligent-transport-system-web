import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        createVehicleDialog: false,
        updateVehicleDialog: false,
    },
    getters: {
        createVehicleDialog: state => {
            return state.createVehicleDialog
        },
        updateVehicleDialog: state => {
            return state.updateVehicleDialog
        },
    },
    mutations: {
        setCreateVehicleDialog (state, value) {
            state.createVehicleDialog = value
        },
        setUpdateVehicleDialog (state, value) {
            state.updateVehicleDialog = value
        },
    },
    actions: {
        openCreateVehicleDialog ({commit}) {
            commit('setCreateVehicleDialog', true)
        },
        closeCreateVehicleDialog ({commit}) {
            commit('setCreateVehicleDialog', false)
        },

        openUpdateVehicleDialog ({commit}) {
            commit('setUpdateVehicleDialog', true)
        },
        closeUpdateVehicleDialog ({commit}) {
            commit('setUpdateVehicleDialog', false)
        },
    },
    modules: {}
}
