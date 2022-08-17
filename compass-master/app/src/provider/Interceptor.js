import axios from 'axios'
import appGlobal from '../../constants/appglobal';
import AsyncStorage from "@react-native-async-storage/async-storage";
const AxiosInstance = axios.create({
    baseURL: appGlobal.APIURL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json'
    }
})

AxiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (!error.response) {
        return Promise.reject('Network Error')
    } else {
        return error.response
    }
});
AxiosInstance.interceptors.request.use(async(request) => {
    const token = await AsyncStorage.getItem(appGlobal.localStorageKeys.token);
    if (token) {
        request.headers.authorization = `Bearer ${token}`;
    }
    return request;
}, (error) => {
    return Promise.reject(error);
});


export default AxiosInstance


