<script>
import {Line} from 'vue-chartjs';

export default {
  name: 'LineChart',
  extends: Line,
  props: ['data', 'options'],
  mounted () {
   this.renderChart(this.data, this.options)
 }
  // mounted () {
  //   this.renderChart({
  //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //     datasets: [
  //       {
  //         label: 'Data One',
  //         backgroundColor: '#f87979',
  //         data: [40, 39, 10, 40, 39, 80, 40]
  //       }
  //     ]
  //   }, {responsive: true, maintainAspectRatio: false})
  // }
}
</script>
