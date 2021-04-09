<template>
  <div>
    <v-card>
      <v-card-text>
          <v-btn class="primary mb-3" @click="openCreateVehicleDialog()">Thêm mới</v-btn>
          <v-data-table
            :headers="headersVehicle"
            :items="vehicleList"
            class="custom-table"
          >
            <template v-slot:item.vehicle_type="{ item }">
                {{ vehicleType[item.vehicle_type].text }}
            </template>

            <template v-slot:item.action="{ item }">
            <v-row>
              <v-col>
                <v-icon @click="openUpdateDialog(item)">mdi-pencil</v-icon>
                <v-divider vertical style="color: #ff1744"></v-divider>
                <v-icon color="error" @click="openDeleteVehicleDialog(item)">mdi-delete</v-icon>
              </v-col>
            </v-row>
          </template>
          </v-data-table>
      </v-card-text>
    </v-card>
    <CreateVehicleDialog/>
    <UpdateVehicleDialog/>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import constants from '../../constants/constants'
import CreateVehicleDialog from './CreateVehicleDialog'
import UpdateVehicleDialog from './UpdateVehicleDialog'

export default {
    computed:{
        ...mapGetters('vehicle',['vehicleList','headersVehicle'])
    },
    methods:{
        ...mapActions('vehicle', ['getVehicleList', 'retrieveVehicle']),
        ...mapActions('display', ['openCreateVehicleDialog','openUpdateVehicleDialog']),
        openUpdateDialog(item){
            this.retrieveVehicle(item.id)
            this.openUpdateVehicleDialog()
        }
    },
    data: () => ({
      vehicleType: constants.VEHICLE_TYPE,
    }),
    mounted() {
        this.getVehicleList()
    },
    components:{
        CreateVehicleDialog,
        UpdateVehicleDialog
    }
}
</script>

<style scoped>

</style>
