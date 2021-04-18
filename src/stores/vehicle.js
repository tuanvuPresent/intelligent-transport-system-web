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
            {text: 'Chủ sở hữu', value: 'owner.name'},
            {text: 'Thao tác', value: 'action'},
        ],
        paramVehicleUpdate :{owner:{name:''}}
    },
    getters: {
        vehicleList: state => {
            return state.vehicleList
        },
        headersVehicle: state => {
            return state.headersVehicle
        },
        paramVehicleUpdate: state => {
            return state.paramVehicleUpdate
        }
    },
    mutations: {
        setVehicleList (state, value) {
            state.vehicleList = value
        },
        setParamVehicleUpdatet (state, value) {
            state.paramVehicleUpdate = value
        },
        noAction () {
            return
        },
    },
    actions: {
        getVehicleList ({commit}, params) {
            customAxios
                .get('api/v1/vehicles/',{params: params})
                .then(response => {
                    commit('setVehicleList', response.data.data)      
                })
        },
        retrieveVehicle ({commit}, id) {
            customAxios
                .get('api/v1/vehicles/' + id + '/')
                .then(response => {
                    commit('setParamVehicleUpdatet', response.data.data)      
                })
        },
        createVehicle ({commit}, data) {
            commit('noAction')
            return new Promise(function (resolve) {
                customAxios.post('api/v1/vehicles/', data)
                    .then(response => {
                        return response.data.status ? resolve() : resolve(response.data.message.vi)
                    })
            });
        },
        updateVehicle ({commit}, data) {
            const id = data.id
            const owner = data.owner.name
            data.owner_name = owner
            commit('noAction')
            return new Promise(function (resolve) {
                customAxios.put('api/v1/vehicles/' + id + '/', data)
                    .then(response => {
                        return response.data.status ? resolve() : resolve(response.data.message.vi)
                    })
            });
        },
        deleteVehicle ({commit}, id) {
            commit('noAction')
            return new Promise(function (resolve) {
                customAxios.delete('api/v1/vehicles/' + id + '/')
                    .then(response => {
                        return response.data.status ? resolve() : resolve(response.data.message.vi)
                    })
            });
        }
    },
    modules: {}
}
