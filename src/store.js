const store = {
    getList() {
        return JSON.parse(window.localStorage.getItem('list')) || []
    },
    addApp(app) {
        const list = [...this.getList(), app];
        window.localStorage.setItem('list', JSON.stringify(list))
    }
}



export default store
