const store = {
    getList() {
        return JSON.parse(window.localStorage.getItem('list')) || []
    },
    addApp(app) {
        const list = [...this.getList(), app];
        window.localStorage.setItem('list', JSON.stringify(list))
    },
    delApp(name) {
        const list = [...this.getList()].filter(el => el.name !== name)
        window.localStorage.setItem('list', JSON.stringify(list))
    }
}

export default store
