import axios from 'axios';

const search = (keyword) => {
    return axios.create({
        baseURL: "https://dapi.kakao.com/v3/search/book?target=title",
        headers: { Authorization: "" },
        params: { query: keyword }
    });
}

const searchBook = () => {
    return search("리덕스").get();
}

const api = {
    searchBook
};

export default api;
