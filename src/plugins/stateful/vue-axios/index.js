export default {
    /**
     * Install plugin
     * @param Vue
     * @param axios
     */

    install(Vue, axios) {
        if (this.installed) {
            return
        }
        this.installed = true

        if (!axios) {
            console.error('You have to install axios')
            return
        }

        Vue.axios = axios

        Vue.prototype.axios = axios;
        Vue.prototype.$http = axios;
    }
}