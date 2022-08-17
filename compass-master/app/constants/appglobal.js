export default {
    APIURL: 'https://mediaapitest2.azurewebsites.net/',
    S3URL: 'https://compass-media.s3.amazonaws.com/',
    Auth0Credentials: {
        clientId: "8LaQR5bXMmsgwmCeGQqsmNAyuoqg0NQc",
        domain: "dev-vk-x7rpt.us.auth0.com"
    },
    APIEndpoints: {
        auth: 'Auth',
        users: 'Users',
        assessments: 'Assessments',
        content: 'Content',
        contentbyid: 'Content/',
        getContentConsumptionByMedia: 'ContentConsumption/contentconsumptionbymedia/',
        contentWithSection: 'Content/contentwithsections',
        contentconsumptionbycontent: 'ContentConsumption/contentconsumptionbycontent',
        consumption: 'ContentConsumption',
        search: 'Search',
        contentConsumptionbymedia: 'Profile/contentconsumptionbymedia/',
        onGoingConsumptionMedia: 'ContentConsumption/contentconsumptionwithsection',
        category: 'Category',
        allcontentsconsumptionwithsection: 'ContentConsumption/allcontentsconsumptionwithsection',
        getRecommendedcontent: 'Content/recommendedcontentswithsections',
        getCategoryDetail: 'ContentConsumption/categoryconsumptionwithsectionbyid/',
        getFollowingCategory: 'Category/getfollowedcategories',
        getNotConsumedCourseDetail: 'Content/contentwithsectionsbyid',
        mood: 'Mood',
    },
    getEndpoint: (apiEndpoint) => {
        return `https://mediaapitest2.azurewebsites.net/${apiEndpoint}`;
    },
    localStorageKeys: {
        user: 'User',
        token: 'Token',
        assessmentDate: 'AssessmentDate',
        articleConsumptionLength: 'ArticleConsumptionLength',
        articleConsumptionId: 'ArticleConsumptionId',
        articleYOffset: 'ArticleYOffset'
    },
    trimText: (text, charlength) => {
        if (text && text.length > charlength) {
            return text.substring(0, charlength - 4) + '...';
        } else {
            return text;
        }
    }
}
