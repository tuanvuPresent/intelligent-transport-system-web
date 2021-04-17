<template>
  <v-row justify="center">
    <v-dialog
        v-model="createVehicleDialog"
        @click:outside="closeDialog"
        @keydown.esc="closeDialog"
        width="60%"
        :key="indexCreateProject"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Thêm phương tiện mới</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="padding: 30px">
            <v-form ref="form">
                <v-row>
                    <v-col>
                        <v-select
                            :items="vehicleType"
                            label="Loại phương tiện"
                            v-model="paramVehiclePost.vehicle_type"
                            outlined
                            name="vehicle_type"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('vehicle_type')"
                        ></v-select>

                        <v-text-field
                            v-model="paramVehiclePost.brand"
                            label="Thương hiệu"
                            outlined
                            name="brand"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('brand')"
                        ></v-text-field>

                        <v-text-field
                            v-model="paramVehiclePost.name"
                            label="Tên phương tiện"
                            outlined
                            name="vehicle_name"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('vehicle_name')"
                        ></v-text-field>
                    </v-col>

                    <v-col>
                        <v-text-field
                            v-model="paramVehiclePost.color"
                            label="Màu sắc"
                            outlined
                        ></v-text-field>

                        <v-text-field
                            v-model="paramVehiclePost.license_plate"
                            label="Biển số xe"
                            outlined
                            name="license_plate"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('license_plate')"
                        ></v-text-field>

                         <v-text-field
                            v-model="paramVehiclePost.owner_name"
                            label="Chủ sở hũu"
                            outlined
                            name="owner_name"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('owner_name')"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-textarea label="Mô tả"
                    v-model="paramVehiclePost.description"
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
              @click="closeCreateVehicleDialog()"
          >
            Hủy
          </v-btn>
          <v-btn
              class="primary"
              text
              @click="submitCreateVehile()"
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
        ...mapGetters('display', ['createVehicleDialog'])
    },
    methods:{
        ...mapActions('display', ['closeCreateVehicleDialog']),
        ...mapActions('vehicle', ['createVehicle', 'getVehicleList']),
        closeDialog(){
            this.indexCreateProject += 1
            this.closeCreateVehicleDialog()
        },
        async submitCreateVehile(){
            const isvalid = await this.$validator.validateAll()
            if(isvalid){
                const error = await this.createVehicle(this.paramVehiclePost)
                if (!error) {
                    Vue.$toast.success(constants.VEHICLE_MESSAGE.CREATE_SUCCESS)
                    this.getVehicleList()
                    this.closeDialog()
                    this.paramVehiclePost  = {}
                } else {
                    Vue.$toast.error(error + '')
                }
            }
        }
    },
    data: () => ({
        indexCreateProject: 0,
        paramVehiclePost : {},
        vehicleType: constants.VEHICLE_TYPE,
    }),
    mounted() {
    },
}
</script>

<style scoped>

</style>
