export const addHotel = async (token, data) => {
    console.log("API:- ", token, data);

    try {
        // Create FormData object
        const formData = new FormData();
        
        // Append non-image hotel data (text fields) to FormData
        for (const key in data) {
            if (key === 'keyPoints') {
                // Stringify the keyPoints array if it's an object or array
                formData.append('keyPoints', JSON.stringify(data[key]));
            } else if (key !== 'images' && data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }
        // Append image files from data.images (which is an array of File objects)
        if (Array.isArray(data.images)) {
            data.images.forEach((image, index) => {
                formData.append('images', image);  // Key 'images' should match the backend field name
            });
        }
        
        // Send request with FormData (do NOT set content-type manually)
        const response = await fetch("http://localhost:8081/hotel-owner/add-hotel", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                // Content-Type will be automatically set by the browser for FormData
            },
            body: formData  // Send FormData object as the body
        });

        const responseData = await response.json();
        console.log("response:- ", responseData);
        return responseData;
    } catch (error) {
        console.error("Error in making the addHotel request", error);
        return error;
    }
};

// export const fetchCities = async () => {
//     try{
//         const response =await fetch("http:localhost:8081/cities", {
//             method: "GET",
//             headers: {
//                 "Accept": "application/json",
//             }
//         })
//         const data = await response.json()
//         console.log("data of cities: ", data)
//         return data;
//     }catch(error) {
//         console.log("Error in fetching cities: ", error)
//         return error
//     }
// }
