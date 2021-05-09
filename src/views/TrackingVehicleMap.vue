<template>
  <div>
      <v-row>
          <v-col cols="8" style="padding:0px">
               <v-card>
                <gmap-map
                :center="center"
                :zoom="12"
                style="width:100%;  height: 85vh;margin:auto;padding:0px"
                >
                <div v-if="tabActive === 0">
                    <div v-for="(item) in vehicleLocaltionList" :key="item.id">
                        <gmap-marker
                            :key="index"
                            v-for="(m, index) in item.position"
                            :position="m"
                            @click="clickItem(item)"
                            :clickable="true"
                            :title="m.title"
                        ></gmap-marker>
                    </div>
                </div>

                <div v-if="tabActive === 1">
                    <gmap-marker
                        :key="index"
                        v-for="(m, index) in vehicleLocaltionHistory.position"
                        :position="m"
                        :clickable="true"
                        :title="m.title"
                    ></gmap-marker>
                </div>
                </gmap-map>
            </v-card>
          </v-col>
            <v-col class="pt-0" cols="4">
                <v-card class="form vehicle">
                    <v-tabs @change="changeTab($event)">
                        <v-tab class="tab-title">
                            <div>Theo dõi xe</div>
                        </v-tab>
                        <v-tab class="tab-title">
                            <div>Lịch sử xe</div>
                        </v-tab>

                        <v-tab-item>
                            <v-card-text v-if="isShowInfo">
                                    <!-- <v-select
                                        :items="vehicleLocaltionMinutes"
                                        label="Chọn số phút"
                                        v-model="vehicleLocaltionParams.minutes"
                                        outlined
                                        dense
                                    ></v-select> -->
                                    <div v-if="vehicleSelected">
                                        <div><b>Loại phương tiện:</b> {{ vehicleType[vehicleSelected.vehicle_type].text }}</div>
                                        <div><b>Thương hiệu xe:</b> {{ vehicleSelected.brand }}</div>
                                        <div><b>Tên xe:</b> {{ vehicleSelected.name }}</div>
                                        <div><b>Chủ sở hữu:</b> {{ vehicleSelected.owner?vehicleSelected.owner.name:"" }}</div>
                                        <div><b>Biển số xe:</b> {{ vehicleSelected.license_plate }}</div>
                                        <div><b>Vị trí:</b> ( latitude: {{ vehicleSelected.position[0].lat }}, longitude : {{ vehicleSelected.position[0].lng }})</div>
                                        <div><b>Tốc độ hiện tại:</b> {{ vehicleSelected.speed }} ( km/h )</div>
                                    </div>
                            </v-card-text>
                        </v-tab-item>

                        <v-tab-item>
                            <v-card-text class="pa-6">
                                <div>
                                <v-autocomplete
                                    v-model="vehicleSelectedHistory"
                                    :items="vehicleList"
                                    item-text="name"
                                    item-value="id"
                                    outlined
                                    append-icon="mdi-chevron-down"
                                    dense
                                ></v-autocomplete>
                                <v-date-picker
                                    no-title
                                    v-model="dateSelected"
                                    flat
                                    full-width
                                >
                                </v-date-picker>
                                <v-btn class="primary" small
                                @click="getHistoryVehicle"
                                >Hiện lịch sử xe</v-btn>
                                </div>
                            </v-card-text>
                        </v-tab-item>
                    </v-tabs>
                </v-card>

                <v-card class="mt-2" v-if="isShowInfo">
                    <v-card-title>
                        <p>Hình ảnh giao thông</p>
                    </v-card-title>
                    <v-card-text>
                          <v-img src="https://thukyluat.vn/uploads/NewsThumbnail/2020/08/31/17014231-hanh-vi-bi-cam-trong-Du-thao-Luat-Bao-dam-trat-tu-ATGT-duong-bo.png"></v-img>
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
        ...mapActions('trackingVehicle', ['getVehicleLocaltionList', 'setVehicleSelected', 'getHistoryVehicleLocaltion']),
        ...mapActions('vehicle', ['getVehicleList']),
        clickItem(item){
            this.setVehicleSelected(item)
            this.isShowInfo = true
        },
        async getHistoryVehicle(){
            await this.getHistoryVehicleLocaltion({
                id : this.vehicleSelectedHistory,
                params : {
                    date: this.dateSelected
                }
            })
        },
        async changeTab(event){
            this.tabActive = event
            if (event === 0){
                await  this.getVehicleLocaltionList({
                    params : this.vehicleLocaltionParams,
                    loading : true
                })
            } else{
                 this.isShowInfo = false
            }
        }
    },
    computed:{
        ...mapGetters('trackingVehicle', ['vehicleLocaltionList', 'vehicleSelected', 'vehicleLocaltionParams', 'vehicleLocaltionHistory']),
        ...mapGetters('vehicle', ['vehicleList'])
    },
    mounted() {
        this.getVehicleLocaltionList({
            params : this.vehicleLocaltionParams,
            loading : true
        })
        this.getVehicleList()
    },
    data() {
        return {
            isShowInfo: false,
            tabActive: 0,
            vehicleSelectedHistory: '',
            dateSelected : new Date().toISOString().substr(0, 10),
            vehicleLocaltionMinutes:[
                {
                    text: 2,
                    values : 2
                },
                {
                    text: 4,
                    values : 4
                },
                {
                    text: 6,
                    values : 6
                },
                {
                    text: 8,
                    values : 8
                },
                {
                    text: 10,
                    values : 10
                }
            ],
            center:{
                lat: 21.0277644,
                lng: 105.8341598
            },
            vehicleType: constants.VEHICLE_TYPE,
    };
  }
};
</script>

<style>
.vehicle .v-tab--active {
    background: #007bff!important;
    color: aliceblue !important;
}
.tab-title {
  text-transform: none !important;
  width: 50% !important;
  font-size: 12px !important;
}
.vehicle .v-slide-group__content {
    height: 30px !important;
}
</style>
