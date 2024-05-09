export default {
    /**
     * Install plugin
     * @param Vue
     * @param router
     */

    install(Vue, router) {
        if (this.installed) {
            return
        }
        this.installed = true

        if (!router) {
            console.error('You have to install axios')
            return
        }

        Object.defineProperty(Vue.prototype, '$_router', {
            get: function get () { return router },
        });
    }
}