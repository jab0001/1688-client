import Vue from 'vue'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import LineChart from '@/components/Charts/LineChart'
import BarChart from '@/components/Charts/BarChart'
import PieChart from '@/components/Charts/PieChart'
import DoughnutChart from '@/components/Charts/DoughnutChart'
import WorldMap from '@/components/WorldMap/WorldMap'

// https://webpack.js.org/guides/dependency-management/#require-context
export default function getComponents() {
  let components = {}
  let baseComponents = loadComponents()
  let otherComponents = {
    LineChart,
    BarChart,
    PieChart,
    DoughnutChart,
    WorldMap,
  }

  components = {
    ...baseComponents,
    ...otherComponents
  }

  return components
}

function loadComponentFolder(requireComponent, components) {
  requireComponent.keys().forEach((fileName) => {
    // Get the component config
    let componentConfig = requireComponent(fileName)
    componentConfig = componentConfig.default || componentConfig
    const componentName = upperFirst(
      camelCase(
        fileName
        // Remove the "./_" from the beginning
          .replace(/^\.\/_/, '')
          // Remove the file extension from the end
          .replace(/\.\w+$/, '')
      )
    )

    components[componentName] = componentConfig
    Vue.component(componentName, componentConfig)
  })
}

function loadComponents() {
  let components = {}
  const componentsFolderContext = require.context('../../src/components', true)

  loadComponentFolder(componentsFolderContext, components);
  return components
}
