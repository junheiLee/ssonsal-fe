import axios from "axios";
import { getCookie } from '../UserService.js';

export const getMatchTeamInfo = async (matchApplicationId) => {

    try {
        const response = await axios.get(`/api/match-teams/${matchApplicationId}`, {
            headers: {
                "Content-Type": "application/json",
                ssonToken: getCookie("token")
            }
        });

        if (response.data.code === "SUCCESS") {

            return response.data.data.matchTeamInfo;
        } else {
            console.log("CODE: ", response.data.code);
        }
    } catch (error) {
        console.error("getMatchTeamInfo 오류: ", error);
        console.error("요청 url = ", `/api/match-teams/${matchApplicationId}`)
        throw error;
    }
}

export const applyToGameAsAway = async (gameId, matchApplication) => {
    try {
        const response = await axios.post(`/api/games/${gameId}/match-applications`, matchApplication, {
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

export const readMatchApplications = async (gameId) => {
    console.log("readMatchApplications gameId=", gameId)
    try {
        const response = await axios.get(`/api/games/${gameId}/match-applications`, {
            headers: {
                "Content-Type": "application/json",
                ssonToken: getCookie("token")
            }
        })
        if (response.data.code === "SUCCESS") {
            return response.data.data.matchApplications;
        } else {
            console.log("CODE: ", response.data.code);
        }
    } catch (error) {
        console.error("readMatchApplications 오류: ", error);
        alert(error.response.data.message);
        throw error;
    }

}

export const acceptAwayTeam = async (target) => {
    try {
        const response = await axios.post(`/api/match-teams`, target, {
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

export const rejectTeam = async (gameId, matchApplicationId) => {
    try {
        const response = await axios.delete(`/games/${gameId}/match-applications/${matchApplicationId}`, {
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