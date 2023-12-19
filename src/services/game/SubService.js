import axios from "axios";
import { getCookie } from '../UserService.js';

export const getSubs = async (matchApplicationId) => {

    try {
        const response = await axios.get(`/match-teams/${matchApplicationId}/subs`, {
            headers: {
                "Content-Type": "application/json",
                ssonToken: getCookie("token")
            },
        });

        if(response.data.code === "SUCCESS") {
            let subs = response.data.data.subs;
            return subs || [];
        } else {
            console.log(response.data.message);
            return [];
        }
    } catch (error) {
        console.error("getGames 오류: ", error);
        return [];
    }
}

export const getSubApplicants = async (matchApplicationId) => {

    try {

        const response = await axios.get(`/match-applications/${matchApplicationId}/sub-applicants`, {
            headers: {
                "Content-Type": "application/json",
                ssonToken: getCookie("token")
            },
        });

        if(response.data.code === "SUCCESS") {
            let subApplicants = response.data.data.subApplicants;
            return subApplicants || [];
        } else {
            console.log(response.data.message);
            return [];
        }
    } catch (error) {
        console.error("subApplicants 오류: ", error);
        return [];
    }
}