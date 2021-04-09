import axios from "axios";
import router from "../routers/index";
import Vue from "vue";

const axiosinstance = axios.create({
    baseURL: process.env.VUE_APP_API_ROOT,
});

axiosinstance.defaults.timeout = 35000;
axiosinstance.interceptors.response.use(
    function (response) {
        // 200 OK
        return response;
    },
    function (err) {
        const isTimeout = err.code === "ECONNABORTED";
        if (isTimeout) {
            router.push("/timeout-error");
            return err;
        }
        if (!err.response) {
            router.push("/network-error");
            return err;
        } else {
            if (err.response.status == 401) {
                Vue.$cookies.remove('jwt')
                router.push('/login')
            }
            return err.response;
        }
    }
);

export const customAxios = {
    post: (url, data, config) => {
        return new Promise(function (resolve) {
                let loader = Vue.$loading.show({opacity: 0})
                axiosinstance.post(url, data, config)
                    .then((r) => {
                        loader.hide()
                        return resolve(r)
                    })
            }
        )
    },
    put: (url, data, config) => {
        return new Promise(function (resolve) {
                let loader = Vue.$loading.show({opacity: 0})
                axiosinstance.put(url, data, config)
                    .then((r) => {
                        loader.hide()
                        return resolve(r)
                    })
            }
        )
    },
    get: (url, config) => {
        return new Promise(function (resolve) {
            let loader = Vue.$loading.show({opacity: 0})
            axiosinstance.get(url, config)
                .then((r) => {
                    loader.hide()
                    return resolve(r)
                })
        })
    },
    delete: (url, config) => {
        return new Promise(function (resolve) {
            let loader = Vue.$loading.show({opacity: 0})
            axiosinstance.delete(url, config)
                .then((r) => {
                    loader.hide()
                    return resolve(r)
                })
        })
    }
}

export default customAxios