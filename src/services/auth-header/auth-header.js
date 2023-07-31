import { services } from ".."

export const authHeader = () => {
    const token = services.encryptedLocalStorage.getItem("pickanddrivetoken");

    let header = {}
    if(token){
        header = {
            "Authorization": `Bearer ${token}`
        }
    }
    return header
}