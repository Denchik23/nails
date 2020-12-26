export default {
    LOADING(state, loading) {
        state.loading = Boolean(loading)
    },
    READY(state) {
        state.ready = true
    }
}
