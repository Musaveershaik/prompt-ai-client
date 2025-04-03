import axios from "axios";

const API_URL = "https://072bcd7d-7047-45ca-9e3f-861b1ebc4dcc-00-1fiinpo7y8e07.sisko.repl.co/";

export const fetchChatResponse = async (question) => {
    try {
        const response = await axios.post(API_URL, {question});
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}