const baseURL = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi"

export interface User {
    login_name: string
    description: string
    full_name: string
    session_id: string
}

export type UserResponse = User[];

export interface AppStorage {
    user_auth: User
    data: null
}

/**
 * Performs a login operation with the provided username and password.
 * @param {string} username - The username for authentication.
 * @param {string} password - The password for authentication.
 * @returns {Promise<any>} - A promise that resolves with the login response data.
 */
export async function login(username: string, password: string): Promise<any> {
    const myAuth = { 'entity': 'authentication', 'login': username, 'password': password }

    const authGetData = new URLSearchParams(myAuth).toString()
    try {
        const response = await fetch(baseURL + '?' + authGetData)
        const data = await response.json()
        console.log(data)
        const auth = data as UserResponse
        const appStorage: AppStorage = { user_auth: auth[0], data: null }
        sessionStorage.setItem("web_fc_utm_my_ttms", JSON.stringify(appStorage))
        console.log(sessionStorage.getItem("web_fc_utm_my_ttms"))
        return data
    } catch (error) {
        console.error("AJAX error!")
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
