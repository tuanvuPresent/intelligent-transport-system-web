import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        count: 10
    },
    getters: {
        count: state => {
            return state.count
        }
    },
    mutations: {
        incrementCount (state) {
            state.count++
        },
        decrementCount (state) {
            state.count--
        }
    },
    actions: {
        incrementCount (context) {
            context.commit('incrementCount')
        },
        decrementCount (context) {
            context.commit('decrementCount')
        }
    },
    modules: {}
}
