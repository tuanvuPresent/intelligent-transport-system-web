import Vue from 'vue'
import Vuex from 'vuex'
import customAxios from './customAxios'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        vehicleList: [],
        headersVehicle: [
            {text: 'Loại', value: 'vehicle_type'},
            {text: 'Thương hiệu', value: 'brand'},
            {text: 'Tên', value: 'name'},
            {text: 'Màu sắc', value: 'color'},
            {text: 'Biển số xe', value: 'license_plate'},
            {text: 'Mô tả', value: 'description'},
        ],
    },
    getters: {
        vehicleList: state => {
            return state.vehicleList
        },
        headersVehicle: state => {
            return state.headersVehicle
        }
    },
    mutations: {
        setVehicleList (state, value) {
            state.vehicleList = value
        },
    },
    actions: {
        getVehicleList ({commit}) {
            customAxios
                .get('api/v1/vehicles/')
                .then(response => {
                    commit('setVehicleList', response.data.data)      
                })
        }
    },
    modules: {}
}
