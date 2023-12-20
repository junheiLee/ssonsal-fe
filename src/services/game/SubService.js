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

        if (response.data.code === "SUCCESS") {
            let subs = response.data.data.subs;
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

        if (response.data.code === "SUCCESS") {
            let subApplicants = response.data.data.subApplicants;
            return subApplicants || [];
        } else {
            console.log(response.data.message);
            return [];
        }
    } catch (error) {
        console.error("subApplicants 오류: ", error);
        return [];
    }}


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

// 용병 신청하기
export const getSubApply = async (matchApplicationId) => {
    try {
        const response = await axios.post(`/match-applications/${matchApplicationId}/sub-applicants`, null, {
            headers: {
                "Content-Type": "application/json",
                ssonToken: getCookie("token")
            },
        });

        return await getSubApplicants(matchApplicationId);

    } catch (error) {
        alert(error.response.data.message);
        console.error('API 요청 중 오류 발생', error);
        throw error;
    }
};

export const rejectSub = async (matchApplicationId, subApplicantId) => {
    try {
        const response = await axios.delete(`/match-applications/${matchApplicationId}/sub-applicants/${subApplicantId}`, {
            headers: {
                "Content-Type": "application/json",
                ssonToken: getCookie("token")
            }
        });

        if (response.data.code === "SUCCESS") {
            return response.data.data.rejectedSubUserId;
        }

    } catch (error) {
        console.error("rejectSub 오류: ", error);
        alert(error.response.data.message);
        throw error;
    }
}

export const acceptSub = async (matchApplicationId, values) => {
    try {
        const response = await axios.post(`/match-teams/${matchApplicationId}/subs`, values, {
            headers: {
                "Content-Type": "application/json",
                ssonToken: getCookie("token")
            }
        });

        if (response.data.code === "SUCCESS") {
            return response.data.data.createdSubId;
        } 
    }catch (error) {
        console.error("acceptSub 오류: ", error);
        alert(error.response.data.message);
        throw error;
    }
} 
