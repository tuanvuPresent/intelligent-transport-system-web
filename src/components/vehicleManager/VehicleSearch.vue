<template>
  <div>
    <v-card>
        <v-card-text>
          <v-row>
                <v-col>
                    <v-select
                        :items="vehicleType"
                        label="Loại phương tiện"
                        v-model="paramSearchVehicle.vehicle_type"
                        outlined
                        dense
                    ></v-select>

                    <v-text-field
                        v-model="paramSearchVehicle.brand"
                        label="Thương hiệu"
                        outlined
                        dense
                    ></v-text-field>
                </v-col>

                <v-col>
                    <v-text-field
                        v-model="paramSearchVehicle.name"
                        label="Tên xe"
                        outlined
                        dense
                    ></v-text-field>

                    <v-text-field
                        v-model="paramSearchVehicle.license_plate"
                        label="Biển số xe"
                        outlined
                        dense
                    ></v-text-field>
                </v-col>

                <v-col>
                    <v-btn class="primary" @click="getVehicleList(paramSearchVehicle)">Tìm kiếm</v-btn>
                </v-col>
          </v-row>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
import constants from '../../constants/constants'
import {mapActions} from 'vuex'

export default {
    computed:{
    },
    methods:{
        ...mapActions('vehicle', ['getVehicleList'])
    },
    data: () => ({
        paramSearchVehicle:{},
        vehicleType: constants.VEHICLE_TYPE,
    }),
    mounted() {
    },
    components:{
    }
}
</script>

<style scoped>

</style>
