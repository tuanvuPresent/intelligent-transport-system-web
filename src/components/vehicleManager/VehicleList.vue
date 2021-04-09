<template>
  <div>
    <v-card>
      <v-card-text>
          <v-btn class="primary mb-3" @click="openCreateVehicle()">Thêm mới</v-btn>
          <v-data-table
            :headers="headersVehicle"
            :items="vehicleList"
            class="custom-table"
          >
            <template v-slot:item.vehicle_type="{ item }">
                {{ vehicleType[item.vehicle_type].text }}
            </template>
          </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import constants from '../../constants/constants'

export default {
    computed:{
        ...mapGetters('vehicle',['vehicleList','headersVehicle'])
    },
    methods:{
        ...mapActions('vehicle', ['getVehicleList']),
        openCreateVehicle(){
            console.log('1')
        }
    },
    data: () => ({
      vehicleType: constants.VEHICLE_TYPE,
    }),
    mounted() {
        this.getVehicleList()
    },
}
</script>

<style scoped>

</style>
