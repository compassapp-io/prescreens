import Auth0 from 'react-native-auth0';
import appglobal from "../../constants/appglobal";
const auth0 = new Auth0(appglobal.Auth0Credentials);

export default auth0