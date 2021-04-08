<template>
  <v-app style="margin: auto;background: #f3f3f3;padding: 20px">
    <v-navigation-drawer app clipped light v-model="drawer" :mini-variant.sync="drawer" permanent>
      <Menu/>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Menu from "@/layouts/Menu";

export default {
  props: {
    source: String
  },
  data: () => ({
    mini: true,
    drawer: null
  }),
  components: {
    Menu
  },
  mounted() {
  },
  methods: {}
};
</script>
<style lang="scss"></style>
