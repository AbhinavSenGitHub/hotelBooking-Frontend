import { setCookie } from "../../common/cookie"

export const createUser = async (userData) => {
    try {
        const response = await fetch("/auth/signup",
            {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        const data = await response.json()
        console.log("data: ", data)

        
        if (data.success) {
            // Create a cookie with the JSON string of the response data  
            const newData = JSON.stringify({
                token: data.token,
                username: data.userData.username,
                email: data.userData.email,
                userType: data.userData.userType
            })
            // const newData = JSON.stringify(data);
            console.log("newData: ", newData)
            document.cookie = `authCookies=${encodeURIComponent(newData)}; path=/; max-age=${7 * 24 * 60 * 60 * 1000}`;

            console.log("1. document.cookie: " + document.cookie);
        }
        return data
    } catch (error) {
        console.log("error: ", error)
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log("data: ", data)
        if (data.success) {
            const newData = JSON.stringify(data)
            console.log("newData for cookies: ", newData)
            document.cookie = `authCookies=${encodeURIComponent(newData)}; path=/; max-age=${7 * 24 * 60 * 60 * 1000}`;
            
        }
        return data

    } catch (error) {
        console.log("error: ", error)
    }
}