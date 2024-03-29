import axios from "axios";
import { getCookie } from '../UserService.js';

export const getGames = async (option) => {

    try {

        const response = await axios.get(`/api/games/${option}`, {
            headers: {
                "Content-Type": "application/json",
                ssonToken: getCookie("token")
            },
        });

        if (response.data.code === "SUCCESS") {
            let games = response.data.data.games;
            return games || [];
        } else {
            console.log(response.data.message);
            return [];
        }
    } catch (error) {
        console.error("getGames 오류: ", error);
        return [];
    }
}

export const getGame = async (gameId) => {

    try {
        const response = await axios.get(`/api/games/${gameId}`, {
            headers: {
                "Content-Type": "application/json",
                ssonToken: getCookie("token")
            }
        });

        if (response.data.code === "SUCCESS") {
            return response.data.data.gameInfo;
        }

    } catch (error) {
        console.error("getGame 오류: ", error);
        throw error;
    }
}

export const createGame = async (createdGame) => {

    console.log("createdGame = ", createdGame);
    try {
        const response = await axios.post(`/api/games`, JSON.stringify(createdGame), {
            headers: {
                "Content-Type": "application/json",
                ssonToken: getCookie("token")
            }
        })

        if (response.data.code === "SUCCESS") {
            return response.data.data.createdGameId;
        } else {
            console.log(response.data.code);
        }
    } catch (error) {
        alert(error.response.data.message);
        throw error;
    }
}

export const enterResult = async (gameId, values) => {

    console.log("values=", values);
    try {
        const response = await axios.post(`/api/games/${gameId}/result`, values, {
            headers: {
                "Content-Type": "application/json",
                ssonToken: getCookie("token")
            }
        })

        return response.data;
        
    } catch (error) {
        alert(error.response.data.message);
        throw error;
    }
}
