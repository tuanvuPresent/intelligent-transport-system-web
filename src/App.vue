<template>
  <router-view/>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    methods:{
        ...mapActions('trackingVehicle', ['getVehicleLocaltionList']),
        getVehicleLocaltionInterval(){
            this.getVehicleLocaltionList(false)
        }
    },
    mounted() {
        setInterval(this.getVehicleLocaltionInterval, process.env.VUE_APP_TRACKING_VEHICLE_INTERVAL);
    },
    name: 'App',
};
</script>
