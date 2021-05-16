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
        <v-card-text class="black--text pa-4">
            <v-form ref="form">
                <v-row>
                    <v-col>
                        <b>Loại phương  tiện<span class="error--text"> *</span></b>
                        <v-select
                            :items="vehicleType"
                            placeholder="Loại phương tiện"
                            v-model="paramVehiclePost.vehicle_type"
                            outlined
                            dense
                            name="vehicle_type"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('vehicle_type')"
                        ></v-select>

                        <b>Thương hiệu<span class="error--text"> *</span></b>
                        <v-text-field
                            v-model="paramVehiclePost.brand"
                            placeholder="Thương hiệu"
                            outlined
                            dense
                            name="brand"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('brand')"
                        ></v-text-field>

                        <b>Tên phương  tiện<span class="error--text"> *</span></b>
                        <v-text-field
                            v-model="paramVehiclePost.name"
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
                                :background-color="paramVehiclePost.color"
                                solo
                                v-bind="attrs"
                                v-on="on"
                                readonly
                                dense
                                ></v-text-field>
                            </template>
                            <v-color-picker
                                v-model="paramVehiclePost.color"
                            >
                            </v-color-picker>
                        </v-menu>   

                        <b>Biển  số  xe<span class="error--text"> *</span></b>
                        <v-text-field
                            v-model="paramVehiclePost.license_plate"
                            placeholder="Biển số xe"
                            outlined
                            dense
                            name="license_plate"
                            v-validate="{ required: 'required'}"
                            :error-messages="errors.collect('license_plate')"
                        ></v-text-field>

                        <b>Chủ sở  hữu<span class="error--text"> *</span></b>
                        <v-text-field
                            v-model="paramVehiclePost.owner_name"
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
        paramVehiclePost : {color:''},
        vehicleType: constants.VEHICLE_TYPE,
    }),
    mounted() {
    },
}
</script>

<style scoped>

</style>
