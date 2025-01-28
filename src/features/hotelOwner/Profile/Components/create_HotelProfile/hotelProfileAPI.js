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
        const response = await fetch("/hotel-owner/add-hotel", {
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
        const response = await fetch("/all-location", {
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

export const getSearchedRooms = async (location, checkIn, checkOut) => {
    try{
        console.log("in api ", location, checkIn, checkOut)
        const response = await fetch(`/search-rooms/${location}/${checkIn}/${checkOut}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        const data = await response.json()
        console.log("response", data)
        return data.response
    }catch(error){
        console.log("Error in getting rooms by search", error)
        return error;
    }
   
}