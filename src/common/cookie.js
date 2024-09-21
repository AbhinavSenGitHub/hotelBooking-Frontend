export const setCookie = (name, jsonData, days) => {
    let expires = ""
    if(days){
        const date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  
        expires = "; expires=" + date.toUTCString();  
    }  
    document.cookie = name + "=" + (jsonData || "") + expires + "; path=/";  
}

function getCookie(name) {
    // Construct a string for finding the cookie by name
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    // Check if the cookie exists and return its value
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }

    // Return null if the cookie is not found
    return null;
}

export const fetchToken = async () => {  
    const token = getCookie("authCookies");
    console.log("token in fetchToken: ", token)  
    if (!token) {  
        console.log("authToken cookie not found");  
        return null; // Return null if the token is not found  
    }  
    
    try {  
        const decodedToken = decodeURIComponent(token);  
        const jsonObject = JSON.parse(decodedToken);  
        console.log("jsonObject.token", jsonObject);  
        return jsonObject.token
    } catch (error) {  
        console.log("Error in fetching token: ", error);  
        return null; // Return null on error  
    }  
} 