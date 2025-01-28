export const editRoom = async (accessToken, roomData, roomId) => {
    try { 
        const formData = new FormData();
        for (const key in roomData) {
            if (key === "keyPoints") {
                formData.append("keyPoints", JSON.stringify(roomData[key]));
            } else if (key !== "newImages" && roomData.hasOwnProperty(key)) {
                formData.append(key, roomData[key]);
            }
        }

        if (Array.isArray(roomData?.newImages)) {
            roomData.newImages.forEach((image) => {
                formData.append("newImages", image);
            });
        }

        console.log("api:- ", accessToken, roomData);
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        const response = await fetch("/hotel-owner/update-room/"+roomId, {
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

export const deleteRoom = async (accessToken, roomId) => {
    try{
        const response = await fetch('/hotel-owner/delete-room/'+roomId, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })
        const data = await response.json()
        console.log("data in api", data)
        return data
    }catch(error){
        console.log("error in deleting room", error)
        return error
    }
}