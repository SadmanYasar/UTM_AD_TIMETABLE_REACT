import { redirect } from "@tanstack/react-router"

const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi"

export interface User {
    login_name: string
    description: string
    full_name: string
    session_id: string
    admin_session_id: string
    no_pekerja?: string
    role: 'Student' | 'Lecturer'
}

export type UserResponse = User[];

export interface AppStorage {
    user_auth: User
    data: null
}

export async function adminLogin(user: User): Promise<string> {
    const adminAuthURLbase = "http://web.fc.utm.my/ttms/auth-admin.php"

    try {
        //login first
        // const user = await login(username, password)

        // if(!user) return;

        const adminAuthParams = { 'session_id': user.session_id }
        const adminAuthGetData = new URLSearchParams(adminAuthParams).toString()

        const response = await fetch(adminAuthURLbase + '?' + adminAuthGetData)
        const data = await response.json()
        console.log(data)
        const auth = data as UserResponse
        // const appStorage: AppStorage = { user_auth: { ...auth[0], role: "Admin" }, data: null }
        // sessionStorage.setItem("web_fc_utm_my_ttms", JSON.stringify(appStorage))
        // console.log(sessionStorage.getItem("web_fc_utm_my_ttms"))
        return auth[0].session_id
    } catch (error) {
        redirect({
            to: "/login",
        })
        console.error("Admin login error!")
    }

    return ""
}

/**
 * Performs a login operation with the provided username and password.
 * @param {string} username - The username for authentication.
 * @param {string} password - The password for authentication.
 * @returns {Promise<any>} - A promise that resolves with the login response data.
 */
export async function login(username: string, password: string) {
    const myAuth = { 'entity': 'authentication', 'login': username, 'password': password }

    const authGetData = new URLSearchParams(myAuth).toString()
    try {
        const response = await fetch(baseURL + '?' + authGetData)
        const data = await response.json()
        console.log(data)
        const auth = data as UserResponse
        //login as admin
        const adminSessionId = await adminLogin(auth[0])

        const role = auth[0].no_pekerja ? "Lecturer" : "Student"
        const appStorage: AppStorage = { user_auth: { ...auth[0], admin_session_id: adminSessionId, role }, data: null }

        sessionStorage.setItem("web_fc_utm_my_ttms", JSON.stringify(appStorage))
        console.log(sessionStorage.getItem("web_fc_utm_my_ttms"))
        return auth
    } catch (error) {
        redirect({
            to: "/login",
        })
        console.error("Login error!")
    }
}

export function logout() {
    sessionStorage.removeItem("web_fc_utm_my_ttms")
}

// function getEpoch() {
//     var d = new Date();
//     var epoch = Math.round(d.getTime() / 1000);
//     return epoch;
// }

// function checkTimeOut() {
//     var appStorage = JSON.parse(sessionStorage.getItem("web_fc_utm_my_ttms"));

//     var epoch_current = getEpoch();
//     var epoch_lapse = epoch_current - appStorage.epoch_last;

//     console.log(epoch_current);
//     console.log(appStorage.epoch_last);
//     console.log(epoch_lapse);

//     // 15 minutes (900 seconds) for session timeout
//     if (epoch_lapse > 900 ) { 
//         sessionStorage.removeItem("web_fc_utm_my_ttms");
//         closeSidebar();
//         window.location.href = "login.html";
        
//     } else {
//         appStorage.epoch_last = epoch_current;
//         sessionStorage.setItem("web_fc_utm_my_ttms", JSON.stringify(appStorage));
//         console.log(appStorage.epoch_last);
//     }
// }

// function checkSession() {
//     if (sessionStorage.getItem("web_fc_utm_my_ttms") == null) {
//         window.location.href = "login.html";
//     } else {
//         checkTimeOut();
//     }
// }
