<template>
  <v-list dense>
    <v-list-item>
    </v-list-item>
    <v-divider></v-divider>
    <template v-for="(link, i) in menu">
      <v-list-item
          :key="i"
          :to="link.to"
          active-class="blue white--text"
          link
          v-if="!link.sub_links"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-title class="text-start">
          {{ link.title }}
        </v-list-item-title>
      </v-list-item>
      <v-list-group :key="link.title" no-action v-else>
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-title class="text-start">
            {{ link.title }}
          </v-list-item-title>
        </template>
        <v-list-item
            :key="sublink.title"
            :to="sublink.to"
            active-class="blue white--text"
            v-for="sublink in link.sub_links"
        >
          <v-list-item-title v-text="sublink.title" class="text-start"/>
        </v-list-item>
      </v-list-group>
    </template>
  </v-list>
</template>

<script>
import {createComponent} from "@vue/composition-api";

export default createComponent({
  setup() {
    const drawer = true
    const menu = [
      {
        title: 'Quản lý phương tiện', icon: 'mdi-home', to: '/vehicle',
      },
      {
        title: 'Map', icon: 'mdi-map-marker', to: '/tracking-vehicle-map',
      },
    ]
    return {
      drawer,
      menu
    }
  }
})

</script>

<style scoped>

</style>
