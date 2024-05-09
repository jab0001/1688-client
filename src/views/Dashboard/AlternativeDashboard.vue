<template>
  <div>

  </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';

  // Components
  import BaseHeader from '@/components/BaseHeader.vue';
  import BaseProgress from '@/components/BaseProgress.vue';

  // Lists
  import ProgressTrackList from './ProgressTrackList';
  import MembersCard from '@/views/Widgets/MembersCard';
  import TaskList from '@/views/Widgets/TaskList';

  // Tables
  import LightTable from './LightTable';
  import VectorMapCard from '@/views/Widgets/VectorMapCard'

  export default {
    components: {
      LineChart,
      BarChart,
      BaseHeader,
      BaseProgress,
      TaskList,
      VectorMapCard,
      LightTable,
      ProgressTrackList,
      MembersCard
    },
    data() {
      return {
        bigLineChart: {
          chartData: {
            datasets: [
              {
                label: 'Performance',
                data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
              }
            ],
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },
        redBarChart: {
          chartData: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29]
            }]
          }
        }
      };
    }
  };
</script>
<style></style>
