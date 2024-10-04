export const addHotel = async (token, data) => {
    console.log("API:- ", token, data);

    try {
        // Create FormData object
        const formData = new FormData();
        
        // Append non-image hotel data (text fields) to FormData
        for (const key in data) {
            if (key === 'keyPoints') {
                formData.append('keyPoints', JSON.stringify(data[key]));
            } else if (key !== 'images' && data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }
        if (Array.isArray(data.images)) {
            data.images.forEach((image, index) => {
                formData.append('images', image); 
            });
        }
        
        console.log("Formdata: ", formData)
        const response = await fetch("http://localhost:8081/hotel-owner/add-hotel", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData
        });

        const responseData = await response.json();
        console.log("response:- ", responseData);
        return responseData;
    } catch (error) {
        console.error("Error in making the addHotel request", error);
        return error;
    }
};

export const getAllLocaton = async () => {
    try{
        const response = await fetch("http://localhost:8081/all-location", {
            method: "GET",
            headers: {
                "Accept": "application/json",
            }
        })

        const data = await response.json()
        console.log("data in the API", data)
        return data
    }catch(error) {
        console.error("Error in fetching the location", error)
        return error;
    }
}