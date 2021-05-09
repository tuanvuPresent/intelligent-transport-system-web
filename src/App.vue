<template>
  <router-view/>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters('trackingVehicle', ['vehicleLocaltionParams'])
    },
    methods:{
        ...mapActions('trackingVehicle', ['getVehicleLocaltionList']),
        getVehicleLocaltionInterval(){
            this.getVehicleLocaltionList({
                params : this.vehicleLocaltionParams,
                loading : false
            })
        }
    },
    mounted() {
        setInterval(this.getVehicleLocaltionInterval, process.env.VUE_APP_TRACKING_VEHICLE_INTERVAL);
    },
    name: 'App',
};
</script>
