import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        createVehicleDialog: false,
        updateVehicleDialog: false,
        deleteVehicleDialog: false,
    },
    getters: {
        createVehicleDialog: state => {
            return state.createVehicleDialog
        },
        updateVehicleDialog: state => {
            return state.updateVehicleDialog
        },
        deleteVehicleDialog: state => {
            return state.deleteVehicleDialog
        },
    },
    mutations: {
        setCreateVehicleDialog (state, value) {
            state.createVehicleDialog = value
        },
        setUpdateVehicleDialog (state, value) {
            state.updateVehicleDialog = value
        },
        setDeleteVehicleDialog (state, value) {
            state.deleteVehicleDialog = value
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

        openDeleteVehicleDialog ({commit}) {
            commit('setDeleteVehicleDialog', true)
        },
        closeDeleteVehicleDialog ({commit}) {
            commit('setDeleteVehicleDialog', false)
        },
    },
    modules: {}
}
