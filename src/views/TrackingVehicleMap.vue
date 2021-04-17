<template>
  <div>
      <v-row>
          <v-col cols="8" class="mr-5" style="padding:0px">
               <v-card>
                <gmap-map
                :center="center"
                :zoom="12"
                style="width:100%;  height: 85vh;margin:auto;padding:0px"
                >
                <gmap-marker
                    :key="index"
                    v-for="(m, index) in vehicleLocaltionList"
                    :position="m.position"
                    @click="clickItem(m)"
                    :clickable="true"
                    :title="m.title"
                ></gmap-marker>
                </gmap-map>
            </v-card>
          </v-col>
            
            <v-col class="pa-0">
                <v-card  v-if="info">
                    <v-card-text>
                        <div><b>Loại phương tiện:</b> {{ vehicleType[info.vehicle_type].text }}</div>
                        <div><b>Thương hiệu xe:</b> {{ info.brand }}</div>
                        <div><b>Tên xe:</b> {{ info.name }}</div>
                        <div><b>Chủ sở hữu:</b> {{ info.owner?info.owner.name:"" }}</div>
                        <div><b>Biển số xe:</b> {{ info.license_plate }}</div>
                        <div><b>Vị trí:</b> ( latitude: {{ info.position.lat }}, longitude : {{ info.position.lng }})</div>
                        <div><b>Tốc độ hiện tại:</b> {{ info.speed }}</div>
                    </v-card-text>
                </v-card>
            </v-col>
      </v-row>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import constants from '../constants/constants'
export default {
    methods:{
        ...mapActions('trackingVehicle', ['getVehicleLocaltionList']),
        clickItem(item){
            this.info = item
        }
    },
    computed:{
        ...mapGetters('trackingVehicle', ['vehicleLocaltionList'])
    },
    mounted() {
        this.getVehicleLocaltionList()
    },
    data() {
        return {
            info:'',
            center:{
                lat: 21.0277644,
                lng: 105.8341598
            },
            vehicleType: constants.VEHICLE_TYPE,
    };
  }
};
</script>

<style scope>

</style>
