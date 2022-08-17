export const imageUrl = 'https://compass-media.s3.amazonaws.com/';
// export const APIURL = 'https://localhost:5001/';
export const APIURL = 'http://54.148.23.236:9090/';
export const createEndpoint = (url: string): string => {
    return `${APIURL}${url}`;
};
export const utils = {
    photoUrl: (photoFileNameOrUrl: string) => {
        if (photoFileNameOrUrl) {
            return imageUrl + photoFileNameOrUrl;
        }
    },
};