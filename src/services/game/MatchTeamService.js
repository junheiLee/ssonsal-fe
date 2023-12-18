import axios from "axios";

export const getMatchTeamInfo = async (matchApplicationId) => {
    
    try{
        const response = await axios.get(`/match-teams/${matchApplicationId}`,{
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(response.data.code === "SUCCESS") {
            
            return response.data.data.matchTeam;
        } else {
            console.log("CODE: ", response.data.code);
        }
    } catch(error) {
        console.error("getMatchTeamInfo 오류: ", error);
        console.error("요청 url = ", `/match-teams/${matchApplicationId}`)
        throw error;
    }
}