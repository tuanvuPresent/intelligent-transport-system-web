<template>
  <div>
      <v-row>
          <v-col cols="8" class="mr-5" style="padding:0px">
               <v-card>
                <gmap-map
                :center="center"
                :zoom="12"
                style="width:100%;  height: 400px;margin:auto;padding:0px"
                >
                <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    @click="clickItem(m)"
                    :clickable="true"
                    :title="m.title"
                ></gmap-marker>
                </gmap-map>
            </v-card>
          </v-col>
            
            <v-col>
                <v-card>
                    <v-card-text>
                        <p>{{info}}</p>
                    </v-card-text>
                </v-card>
            </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
    methods:{
        clickItem(item){
            this.info = item
        }
    },
    data() {
        return {
            info:'',
            markerOptions: {
            url: require('../assets/logo.png'),
            size: {width: 20, height: 20, f: 'px', b: 'px',},
            scaledSize: {width: 20, height: 20, f: 'px', b: 'px',},
            },
            center:{
                    lat: 21.0277644,
                    lng: 105.8341598
                },
            markers:[ {
                title: 'Xe 1',
                position:{
                    title: "Ha Noi\n Viet Nam",
                    lat: 21.0277644,
                    lng: 105.8341598
                    },
                },
                {
                title: 'Xe 2',
                position:{
                    title: "Ha Noi\n Viet Nam",
                    lat: 21.0277644,
                    lng: 105.2341598
                    },
                }],
            latitude: 21.0277644,
            longitude: 105.8341598,
            apiKey:  process.env.VUE_APP_GOOGLE_API_KEY,
    };
  }
};
</script>

<style scope>

</style>
