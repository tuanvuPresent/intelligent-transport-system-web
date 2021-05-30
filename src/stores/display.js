import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        createVehicleDialog: false,
        updateVehicleDialog: false,
        deleteVehicleDialog: false,
        isShowNotificationDialog: false,
        configNotificationDialog: {
            title: 'Thông báo',
            message: 'Thông báo',
            btnSubmit: Function
        },
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
        isShowNotificationDialog: state => {
            return state.isShowNotificationDialog
        },
        configNotificationDialog: state => {
            return state.configNotificationDialog
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
        setConfigNotificationDialog (state, value = { message: '', title: '' }) {
        for (const property in value) {
            state.configNotificationDialog[property] = value[property]
        }
        },
        setIsShowNotificationDialog (state, value) {
            state.isShowNotificationDialog = value
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

        openNotificationDialog ({ commit }, config = {}) {
            commit('setConfigNotificationDialog', config)
            commit('setIsShowNotificationDialog', true)
        },
        closeNotificationDialog ({ commit }) {
            commit('setIsShowNotificationDialog', false)
        },
    },
    modules: {}
}
