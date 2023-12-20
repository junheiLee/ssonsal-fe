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
        console.log("subService, getSubs url=", `/match-teams/${matchApplicationId}/subs`);

        if(response.data.code === "SUCCESS") {
            let subs = response.data.data.subs;
            console.log(subs);
            return subs || [];
        } else {
            console.log(response.data.message);
            return [];
        }
    } catch (error) {
        console.error("getSubs 오류: ", error);
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


export const closeSubRecruitment = async (matchApplicationId) => {
    try {
        const response = await axios.delete(`/match-applications/${matchApplicationId}/sub-applicants`, {
            headers: {
                "Content-Type": "application/json",
                ssonToken: getCookie("token")
            }
        });

        if (response.data.code === "SUCCESS") {
            return response.data.data.matchApplicantId;
        } else {
            console.log("CODE: ", response.data.code);
        }
    } catch (error) {
        console.error("applyToGameAsAway 오류: ", error);
        alert(error.response.data.message);
        throw error;
    }
}