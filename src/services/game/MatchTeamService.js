import axios from "axios";
import { getCookie } from '../UserService.js';

export const getMatchTeamInfo = async (matchApplicationId) => {
    
    try{
        const response = await axios.get(`/match-teams/${matchApplicationId}`,{
            headers: {
                "Content-Type": "application/json",
                ssonToken: getCookie("token")
            }
        });

        if(response.data.code === "SUCCESS") {
            
            return response.data.data.matchTeamInfo;
        } else {
            console.log("CODE: ", response.data.code);
        }
    } catch(error) {
        console.error("getMatchTeamInfo 오류: ", error);
        console.error("요청 url = ", `/match-teams/${matchApplicationId}`)
        throw error;
    }
}