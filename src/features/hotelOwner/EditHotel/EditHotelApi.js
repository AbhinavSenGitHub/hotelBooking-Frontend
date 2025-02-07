export const editHotel = async (accessToken, hotelData, hotelId) => {
    try { 
        const formData = new FormData();
        for (const key in hotelData) {
            if (key === "keyPoints") {
                formData.append("keyPoints", JSON.stringify(hotelData[key]));
            } else if (key !== "newImages" && hotelData.hasOwnProperty(key)) {
                formData.append(key, hotelData[key]);
            }
        }

        if (Array.isArray(hotelData?.newImages)) {
            hotelData.newImages.forEach((image) => {
                formData.append("newImages", image);
            });
        }

        console.log("api:- ", accessToken, hotelData);
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        const response = await fetch("/hotel-owner/update-hotel/"+hotelId, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("responseData:- ", responseData);
        return responseData;
    } catch (error) {
        console.error("Error in making the create room request", error);
        throw error; // Or handle the error as needed
    }
};

export const deleteHotel = async(accessToken, hotelId) => {
    try{
        console.log("hotel id ", hotelId, accessToken);
        const response = await fetch('/hotel-owner/delete-hotel/'+hotelId, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
    
        console.log("delete response: " , response)
        const data = await response.json();
        return data
    }catch(error){
        console.log("error: ", error)
        return error
    }
}