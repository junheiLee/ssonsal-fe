import { useState, useEffect } from 'react';
import axios from 'axios';

export const SubService = (matchApplicationId) => {
    const [teamSubList, setTeamSubList] = useState([]);
    const [subApplicants, setSubApplicants] = useState([]);

    useEffect(() => {
        subListLoad();
    }, []);

    const subListLoad = async () => {
        axios.get(`/match-applications/${matchApplicationId}/sub-applicants`)
            .then(response => {
                console.log('API 응답:', response);
                setTeamSubList(response.data.data.subApplicants);
            })
            .catch(error => {
                console.error('데이터를 불러오는 중 오류 발생:', error);
            });
    }
    // 용병 신청하기
    const getSubApply = async (matchApplicationId) => {
        try {
            const response = await axios.post(`/match-applications/${matchApplicationId}/sub-applicants`);
            subListLoad();
            setSubApplicants(response.data.data.subApplicants);
        } catch (error) {
            console.error('API 요청 중 오류 발생', error);
            throw error;
        }
    };

    // 용병 승인하기
    const getSubAccept = async (matchApplicationId, subApplicantId) => {
        try {
            const approvalSubDto = {
                subApplicantId: subApplicantId
            };
            const response = await axios.post(`/match-teams/${matchApplicationId}/subs`, approvalSubDto)
            subListLoad();
            setSubApplicants(response.data.data.subApplicants);
        } catch (error) {
            console.error('API 요청 중 오류 발생', error);
            throw error;
        }
    };
    // 용병 거절하기

   const getSubReject = async (matchApplicationId, subApplicantId) => {
        try {
            
            const response = await axios.delete(`/match-applications/${matchApplicationId}/sub-applicants/${subApplicantId}`)

            subListLoad();
            setSubApplicants(response.data.data.subApplicants);
        } catch (error) {
            console.error('API 요청 중 오류 발생', error);
            throw error;
        }
    };
    return { teamSubList, getSubAccept, getSubReject,getSubApply };
};