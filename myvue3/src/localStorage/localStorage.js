export default {
    fetch(key_name) {
        return JSON.parse(window.localStorage.getItem(key_name) || '[]')
    },
    save(key_name, data) {
        window.localStorage.setItem(key_name, JSON.stringify(data))
    }
}