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

            <template v-slot:item.color="{ item }">
                <v-badge :color="item.color"></v-badge>
            </template>

            <template v-slot:item.action="{ item }">
            <v-row>
              <v-col>
                <v-icon @click="openUpdateDialog(item)">mdi-pencil</v-icon>
                <v-divider vertical style="color: #ff1744"></v-divider>
                <v-icon color="error" @click="openDeleteDialog(item)">mdi-delete</v-icon>
              </v-col>
            </v-row>
          </template>
          </v-data-table>
      </v-card-text>
    </v-card>
    <CreateVehicleDialog/>
    <UpdateVehicleDialog/>
    <DeleteConfirmDialog
        :dialog="deleteVehicleDialog"
        :deleteInstance="submitDelete"
        :closeDialog="closeDeleteVehicleDialog"
    />
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import constants from '../../constants/constants'
import CreateVehicleDialog from './CreateVehicleDialog'
import UpdateVehicleDialog from './UpdateVehicleDialog'
import DeleteConfirmDialog from '../dialog/DeleteConfirmDialog'
import Vue from 'vue'

export default {
    computed:{
        ...mapGetters('vehicle',['vehicleList','headersVehicle']),
        ...mapGetters('display',['deleteVehicleDialog']),
    },
    methods:{
        ...mapActions('vehicle', ['getVehicleList', 'retrieveVehicle', 'deleteVehicle']),
        ...mapActions('display', ['openCreateVehicleDialog','openUpdateVehicleDialog','openDeleteVehicleDialog','closeDeleteVehicleDialog']),
        openUpdateDialog(item){
            this.retrieveVehicle(item.id)
            this.openUpdateVehicleDialog()
        },
        openDeleteDialog(item){
            this.deletedId = item.id
            this.openDeleteVehicleDialog()
        },
        async submitDelete(){
            const isvalid = await this.$validator.validateAll()
            if(isvalid){
                const error = await this.deleteVehicle(this.deletedId)
                if (!error) {
                    Vue.$toast.success(constants.VEHICLE_MESSAGE.DELETE_SUCCESS)
                    this.getVehicleList()
                    this.closeDeleteVehicleDialog()
                } else {
                    Vue.$toast.error(error + '')
                }
            }
        }
    },
    data: () => ({
      vehicleType: constants.VEHICLE_TYPE,
      deletedId:''
    }),
    mounted() {
        this.getVehicleList()
    },
    components:{
        CreateVehicleDialog,
        UpdateVehicleDialog,
        DeleteConfirmDialog,
    }
}
</script>

<style scoped>

</style>
