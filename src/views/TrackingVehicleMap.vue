<template>
  <div>
      <div class="d-flex">
        <v-col cols="9" style="padding:0px">
            <v-card>
                <gmap-map
                    :center="center"
                    :zoom="12"
                    style="width:100%;  height: 85vh;margin:auto;padding:0px"
                >
                    <div v-if="tabActive === 0">
                        <div v-for="(item) in vehicleLocaltionList" :key="item.id">
                            <gmap-marker
                                :position="item.position[0]"
                                @click="clickItem(item)"
                                :clickable="true"
                                v-bind:options="{ icon: vehicleSelected && vehicleSelected.id === item.id? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'}"
                            ></gmap-marker>
                            <gmap-polyline v-bind:path.sync="item.position" v-bind:options="{ strokeColor: vehicleSelected && vehicleSelected.id === item.id? 'blue' : 'gray'}">
                            </gmap-polyline>
                        </div>
                    </div>


                    <div v-if="tabActive === 1 && vehicleLocaltionHistory.position">
                        <gmap-marker
                            :position="vehicleLocaltionHistory.position[0]"
                            :clickable="true"
                            icon='http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                        ></gmap-marker>
                        <gmap-polyline v-bind:path.sync="vehicleLocaltionHistory.position" v-bind:options="{ strokeColor:'blue'}">
                        </gmap-polyline>
                    </div>
                </gmap-map>
            </v-card>
        </v-col>

        <v-col cols="3" class="pt-0">
            <v-card class="form vehicle">
                <v-tabs @change="changeTab($event)" height="36">
                    <v-tab class="tab-title">
                       Theo dõi xe
                    </v-tab>
                    <v-tab class="tab-title">
                        <div>Lịch sử xe</div>
                    </v-tab>

                    <v-tab-item>
                        <v-card-text v-if="isShowInfo">
                            <div v-if="vehicleSelected">
                                <div><b>Loại phương tiện:</b> {{ vehicleType[vehicleSelected.vehicle_type].text }}</div>
                                <div><b>Thương hiệu xe:</b> {{ vehicleSelected.brand }}</div>
                                <div><b>Tên xe:</b> {{ vehicleSelected.name }}</div>
                                <div><b>Chủ sở hữu:</b> {{ vehicleSelected.owner?vehicleSelected.owner.name:"" }}</div>
                                <div><b>Biển số xe:</b> {{ vehicleSelected.license_plate }}</div>
                                <div><b>Vị trí:</b> ( latitude: {{ vehicleSelected.position[0].lat }}, longitude : {{ vehicleSelected.position[0].lng }})</div>
                                <div><b>Tốc độ hiện tại:</b> {{ vehicleSelected.position[0].speed }} ( km/h )</div>
                            </div>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card v-if="isShowInfo">
                            <v-card-title>
                                <p>Hình ảnh giao thông</p>
                            </v-card-title>
                            <v-card-text>
                                <v-img src="https://thukyluat.vn/uploads/NewsThumbnail/2020/08/31/17014231-hanh-vi-bi-cam-trong-Du-thao-Luat-Bao-dam-trat-tu-ATGT-duong-bo.png"></v-img>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item>
                        <v-card-text class="pa-6">
                            <div>
                                <v-autocomplete
                                    placeholder="Chọn xe"
                                    v-model="vehicleSelectedHistory"
                                    :items="vehicleList"
                                    item-text="name"
                                    item-value="id"
                                    outlined
                                    append-icon="mdi-chevron-down"
                                    dense
                                ></v-autocomplete>
                               
                                <v-menu
                                    transition="scale-transition"
                                    offset-y
                                    offset-x
                                    min-width="auto"
                                    :nudge-left="290"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="dateSelected"
                                            prepend-inner-icon="mdi-calendar"
                                            readonly
                                            outlined
                                            dense
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                    <v-date-picker
                                        v-model="dateSelected"
                                        no-title
                                    ></v-date-picker>
                                </v-menu>
                            </div>
                            <div class="d-flex justify-center">
                                <v-btn 
                                    class="primary"
                                    @click="getHistoryVehicle"
                                >
                                   Tìm kiếm 
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-tab-item>
                </v-tabs>
            </v-card>
        </v-col>
      </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import constants from '../constants/constants'
export default {
    watch: {
        vehicleLocaltionHistory() {
            if (this.vehicleLocaltionHistory.position.length === 0 ) {
                this.openNotificationDialog({
                    title: 'Thông báo',
                    message: 'Xe này không có lịch sử ngày này'
                })
            }
        }
    },
    methods:{
        ...mapActions('trackingVehicle', ['getVehicleLocaltionList', 'setVehicleSelected', 'getHistoryVehicleLocaltion']),
        ...mapActions('vehicle', ['getVehicleList']),
        ...mapActions('display', ['openNotificationDialog']),
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
                this.setVehicleSelected({})
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

<style lang="scss">
.vehicle .v-tab--active {
    background: #007bff!important;
    color: aliceblue !important;
}
.tab-title {
  text-transform: none !important;
  width: 50% !important;
  font-size: 12px !important;
  border-bottom: #007bff solid 1px;
}
</style>
