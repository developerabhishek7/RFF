import {API_URL, WEB_URL, NODE_URL,USER_API_URL,NODE_URL_ALERT} from '../../env.json'

export const BASE_URL = API_URL;
export const WEB_BASE_URL = WEB_URL;

export const NODE_USER_API = USER_API_URL

export const NODE_ALERT = NODE_URL_ALERT


export const FACEBOOK_URL = 'https://graph.facebook.com/me?fields=id,name,email,birthday,picture&access_token=';
export const AUTH0RIZATION_TOKEN = 'cmV3YXJkX2ZsaWdodF9maW5kZXI6SERGa2ZSZXdhcmRGbGlnaHRGaW5kZXIzMjE=';
export const FACEBOOK_APP_ID = '547320892866347';
export const GOOGLE_STANDALONE_IOS_CLIENT_ID = '21379102654-kr4mibniu49sm67oe346u31vo26ue6pa.apps.googleusercontent.com';
export const GOOGLE_STANDALONE_ANDROID_CLIENT_ID = '21379102654-e3h20sfo7tf6hjasac268slg93jtefm1.apps.googleusercontent.com';
export const GOOGLE_IOS_CLIENT_ID = '21379102654-mbh6p8beiunb76ab48t00nge83gqfu89.apps.googleusercontent.com';
export const GOOGLE_ANDROID_CLIENT_ID = '21379102654-1l68uafr3sccuar8cm2gp2esaf031lgt.apps.googleusercontent.com';

//Node Backend URL
export const GET_LOCATION_NODE_URL = `${NODE_URL}/locations/british-airways`;
export const GET_POSSIBLE_ROUTES_NODE_URL = `${NODE_URL}/possible-routes/british-airways`;
export const GET_MEMBERSHIP_NODE_URL = `${NODE_URL}/airlines`;
export const BASE_NODE_URL = `${NODE_URL}`;


export const UPGRADE_MEMBERSHIP_URL = `${WEB_BASE_URL}/pricing`;
export const FAQ_URL = `${'https://rewardflightfinder.com'}/faq`;
export const PRIVACY_POLICY_URL = `${'https://rewardflightfinder.com'}/privacy-policy`;
export const TERMS_CONDITIONS_URL = `${'https://rewardflightfinder.com'}/terms-of-use`;
export const DISCLAIMER_URL = `${'https://rewardflightfinder.com'}/disclaimer`;
export const MEMBERSHIP_URL = `${WEB_BASE_URL}/dashboard/membership`;
export const WEB_CLIENT_URL = '354611927309-1q1dbpo92q1931f66b45f6d56srmegap.apps.googleusercontent.com';
export const MAPBOX_TOKEN = "pk.eyJ1IjoicmZmYWRtaW4iLCJhIjoiY2tiY2llOXIwMDI2dzJ5azA0c2k0Nno0ZCJ9.gXz54nUwCAgY170oY8wHcA";
// export const MAPBOX_TOKEN = "pk.eyJ1IjoiZmxpZ2h0bWFwcHJvamVjdCIsImEiOiJjbDFkd2VtajIwZzRrM2NueGlkNjMwaXloIn0.79HzZ8IKZFzUgiH1i_RJfQ"
export const FORGET_PASSWORD_URL = `${WEB_BASE_URL}/forgot-password`;
export const BA_URL = `https://www.britishairways.com/travel/home/public/en_in/`;