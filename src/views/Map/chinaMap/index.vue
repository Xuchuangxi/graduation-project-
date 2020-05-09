<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/test1'
export default {
  components: { Chart }
}
</script>

<style scope>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px)
}

</style>
