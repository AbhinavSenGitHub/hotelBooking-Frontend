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

// export const fetchAuthCookie = async () => {  
//     const token = getCookie("authCookies");
//     console.log("token in fetchToken: ", token)  
//     if (!token) {  
//         console.log("authToken cookie not found");  
//         return null; // Return null if the token is not found  
//     }  
    
//     try {  
//         const decodedToken = decodeURIComponent(token);  
//         const jsonObject = JSON.parse(decodedToken);  
//         console.log("jsonObject.token", jsonObject);  
//         return jsonObject
//     } catch (error) {  
//         console.log("Error in fetching token: ", error);  
//         return null; // Return null on error  
//     }  
// } 
export const fetchAuthCookie = async () => {
    try {
        // Fetch the cookie data from the API
        const cookie = await fetch("/auth/cookies", {
            method: "GET",
            headers: {
                "Accept": "application/json", // Ensure you're telling the server you want JSON
            },
            credentials: "include", // Ensures cookies are sent with the request
        });

        // Parse the response
        const response = await cookie.json();
        console.log("Cookie fetched successfullyss:", response);

        // const data = JSON.parse(response.authCookies)
        if (cookie.ok) {
            console.log("Cookie fetched successfully:", response.authCookies);
            return response.authCookies; // Return the cookie if successful
        } else {
            console.error("Failed to fetch cookie:", response.message);
            return null;
        }
    } catch (error) {
        console.error("Error in fetching token:", error);
        return null;
    }
};
