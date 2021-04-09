<template>
  <v-row justify="center">
    <v-dialog
        v-model="updateVehicleDialog"
        @click:outside="closeDialog"
        @keydown.esc="closeDialog"
        width="60%"
        :key="indexUpdateProject"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Cập nhật phương tiện</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="padding: 30px">
            <v-form ref="form">
                <v-row>
                    <v-col>
                        <v-select
                            :items="vehicleType"
                            label="Loại phương tiện"
                            v-model="paramVehicleUpdate.vehicle_type"
                            outlined
                            name="vehicle_type"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('vehicle_type')"
                        ></v-select>

                        <v-text-field
                            v-model="paramVehicleUpdate.brand"
                            label="Thương hiệu"
                            outlined
                            name="brand"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('brand')"
                        ></v-text-field>

                        <v-text-field
                            v-model="paramVehicleUpdate.name"
                            label="Tên phương tiện"
                            outlined
                            name="vehicle_name"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('vehicle_name')"
                        ></v-text-field>
                    </v-col>

                    <v-col>
                        <v-text-field
                            v-model="paramVehicleUpdate.color"
                            label="Màu sắc"
                            outlined
                        ></v-text-field>

                        <v-text-field
                            v-model="paramVehicleUpdate.license_plate"
                            label="Biển số xe"
                            outlined
                            name="license_plate"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('license_plate')"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-textarea label="Mô tả"
                    v-model="paramVehicleUpdate.description"
                    outlined
                    rows="2"
                ></v-textarea>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              class="grey"
              text
              @click="closeUpdateVehicleDialog()"
          >
            Hủy
          </v-btn>
          <v-btn
              class="primary"
              text
              @click="submitUpdateVehile()"
          >
            Lưu lại
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import constants from '../../constants/constants'
import Vue from 'vue'

export default {
    computed:{
        ...mapGetters('vehicle', ['paramVehicleUpdate']),
        ...mapGetters('display', ['createVehicleDialog','updateVehicleDialog']),
    },
    methods:{
        ...mapActions('display', ['closeCreateVehicleDialog','closeUpdateVehicleDialog']),
        ...mapActions('vehicle', ['createVehicle', 'getVehicleList', 'updateVehicle']),
        closeDialog(){
            this.indexUpdateProject += 1
            this.closeUpdateVehicleDialog()
        },
        async submitUpdateVehile(){
            const isvalid = await this.$validator.validateAll()
            if(isvalid){
                const error = await this.updateVehicle(this.paramVehicleUpdate)
                if (!error) {
                    Vue.$toast.success(constants.VEHICLE_MESSAGE.UPDATE_SUCCESS)
                    this.getVehicleList()
                    this.closeDialog()
                } else {
                    Vue.$toast.error(error + '')
                }
            }
        }
    },
    data: () => ({
        indexUpdateProject: 0,
        vehicleType: constants.VEHICLE_TYPE,
    }),
    mounted() {
    },
}
</script>

<style scoped>

</style>
