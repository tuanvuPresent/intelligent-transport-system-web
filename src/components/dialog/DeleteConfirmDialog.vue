<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        width="30%"
        @click:outside="closeDialog"
        @keydown.esc="closeDialog"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Thông báo</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="padding: 30px">
          <div class="text-start">{{ message }}</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              class="grey"
              text
              @click="closeDialog"
          >
            Hủy
          </v-btn>
          <v-btn
              class="error"
              text
              @click="deleteInstance"
          >
            Xóa
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import {createComponent, onMounted} from "@vue/composition-api";

export default createComponent({
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    closeDialog: {
      type: Function
    },
    deleteInstance: {
      type: Function
    },
    message: {
      type: String,
      default: 'Bạn có muốn xóa không ?'
    }
  },
  setup() {
    onMounted(() => {
    });

    return {};
  },
  components: {}
});
</script>

<style scoped>

</style>