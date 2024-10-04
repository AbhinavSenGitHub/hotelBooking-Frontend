export const createRoom = async (token, data) => {
    try {
        const formData = new FormData();
        for (const key in data) {
            if (key === "keyPoints") {
                formData.append("keyPoints", JSON.stringify(data[key]));
            } else if (key !== "roomImage" && data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }

        if (Array.isArray(data.roomImage)) {
            data.roomImage.forEach((image) => {
                formData.append("roomImage", image);
            });
        }

        console.log("api:- ", token, data);
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        const response = await fetch("http://localhost:8081/hotel-owner/create-room", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
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
