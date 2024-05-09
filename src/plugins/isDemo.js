const isDemoPlugin = {
  install: (Vue) => {
    Vue.prototype.$isDemo = process.env.APP_IS_DEMO || 0;
  }
}
  
export default isDemoPlugin