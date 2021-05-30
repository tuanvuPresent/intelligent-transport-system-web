<template>
  <v-row justify="center">
    <v-dialog
      v-model="isShowNotificationDialog"
      content-class="notification-dialog"
      @click:outside="closeNotificationDialog"
      @keydown.esc="closeNotificationDialog"
    >
      <v-card>
        <v-card-title class="title">
          <span>{{ configNotificationDialog.title }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-3">
          <div class="text-start">{{ configNotificationDialog.message }}</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="primary text-initial"
            @click="closeDialog(configNotificationDialog.btnSubmit)"
          >
            Đồng ý
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('display', ['isShowNotificationDialog', 'configNotificationDialog'])
  },
  methods: {
    ...mapActions('display', ['closeNotificationDialog']),
    closeDialog (btnClick) {
      this.closeNotificationDialog()
      btnClick()
    }
  },
  name: 'NotificationDialog'
}
</script>

<style lang="scss">
.notification-dialog {
  width: 30% !important;
}
</style>