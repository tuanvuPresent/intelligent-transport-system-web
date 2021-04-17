<template>
  <div>
    <VehicleSearch class="mb-4"/>

    <VehicleList/>
  </div>
</template>

<script>
import VehicleList from '../components/vehicleManager/VehicleList'
import VehicleSearch from '../components/vehicleManager/VehicleSearch'
export default {
    components:{
        VehicleList,
        VehicleSearch
    }
}
</script>

<style scoped>

</style>
