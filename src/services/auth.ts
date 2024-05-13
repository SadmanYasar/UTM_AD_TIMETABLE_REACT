
const URL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?"

export interface User {
    login_name: string
    description: string
    full_name: string
    session_id: string
}[]

export default async function login(username: string, password: string) {
    const myAuth = { 'entity': 'authentication', 'login': username, 'password': password }

    const authGetData = new URLSearchParams(myAuth).toString()
    try {
        const response = await fetch(URL + '?' + authGetData)
        const data = await response.json()
        console.log(data)
        const auth = JSON.parse(response)
        const appStorage = { user_auth: auth[0], data: null }
        sessionStorage.setItem("web_fc_utm_my_ttms", JSON.stringify(appStorage))
        console.log(sessionStorage.getItem("web_fc_utm_my_ttms"))
        return data
    } catch (error) {
        console.error("AJAX error!")
    }
}