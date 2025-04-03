import axios from "axios";

const API_URL = "https://prompt-ai-musaveershaikh4.replit.app/api/qna/ask";

export const fetchChatResponse = async (question) => {
    try {
        const response = await axios.post(API_URL, {question});
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}