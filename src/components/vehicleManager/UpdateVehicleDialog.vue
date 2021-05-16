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
        <v-card-text class="black--text pa-4">
            <v-form ref="form">
                <v-row>
                    <v-col>
                        <b>Loại phương  tiện<span class="error--text"> *</span></b>
                        <v-select
                            :items="vehicleType"
                            placeholder="Loại phương tiện"
                            v-model="paramVehicleUpdate.vehicle_type"
                            outlined
                            dense
                            name="vehicle_type"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('vehicle_type')"
                        ></v-select>
                        
                        <b>Thương hiệu<span class="error--text"> *</span></b>
                        <v-text-field
                            v-model="paramVehicleUpdate.brand"
                            placeholder="Thương hiệu"
                            outlined
                            dense
                            name="brand"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('brand')"
                        ></v-text-field>

                        <b>Tên phương  tiện<span class="error--text"> *</span></b>
                        <v-text-field
                            v-model="paramVehicleUpdate.name"
                            placeholder="Tên phương tiện"
                            outlined
                            dense
                            name="vehicle_name"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('vehicle_name')"
                        ></v-text-field>
                    </v-col>

                    <v-col>
                        <b>Màu sắc</b>
                        <v-menu
                            transition="scale-transition"
                            offset-y
                            :close-on-content-click="false"
                            max-width="250"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                :background-color="paramVehicleUpdate.color"
                                solo
                                v-bind="attrs"
                                v-on="on"
                                readonly
                                dense
                                ></v-text-field>
                            </template>
                            <v-color-picker
                                v-model="paramVehicleUpdate.color"
                            >
                            </v-color-picker>
                        </v-menu>   
                        
                        <b>Biển  số  xe<span class="error--text"> *</span></b>
                        <v-text-field
                            v-model="paramVehicleUpdate.license_plate"
                            placeholder="Biển số xe"
                            outlined
                            dense
                            name="license_plate"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('license_plate')"
                        ></v-text-field>

                        <b>Chủ sở  hữu<span class="error--text"> *</span></b>
                        <v-text-field
                            v-model="paramVehicleUpdate.owner.name"
                            placeholder="Chủ sở hũu"
                            outlined
                            dense
                            name="owner_name"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('owner_name')"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <b>Mô tả</b>
                <v-textarea 
                    placeholder="Mô tả"
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
