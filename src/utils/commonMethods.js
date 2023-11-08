const dateFormat = require("dateformat");
import { LocaleConfig } from "react-native-calendars";
import { Platform } from "react-native";
import * as IMG_CONST from "../constants/ImageConst";
import * as STR_CONST from "../constants/StringConst";
import { colours } from "../constants/ColorConst";
import * as CONFIG from "../helpers/config";
import DeviceInfo from "react-native-device-info";
import moment from "moment";

module.exports = {
  // Returns date in format(ex. May 13, 2019)
  getDateInNamedMonthFirst(date) {
    const localDate = new Date(date);
    return dateFormat(localDate, "dddd,dd mmmm, yyyy");
  },
getTimeFromMins(mins){
    let hrs = mins / 60 | 0,
        minute = mins % 60 | 0;
        const time = `${hrs ? `${hrs} hr(s)` : '' } ${minute ? `${minute} min(s)` : '' }`
    return time
  },

  isNull(data) {
    if (data) {
      return true;
    }
    return false;
  },

  isAndroid() {
    return Platform.OS == "android";
  },
  isIOS(){
    return Platform.OS == "ios"
  },
  isNotched() {
    return DeviceInfo.hasNotch();
  },

  hasLowerCase(str) {
    return /[a-z]/.test(str);
  },
  hasUpperCase(str) {
    return /[A-Z]/.test(str);
  },
  hasNumber(str) {
    return /\d/.test(str);
  },

  isEmptyString(dataString) {
    if (dataString == "") {
      return true;
    }
    return false;
  },

  isPad() {
    return Platform.isPad;
  },

  getAirlinesLogo(airlines) {
    let icon;
    switch (airlines) {
      case STR_CONST.BRITISH_AIRWAYS:
        {
          icon = IMG_CONST.BRITISH_AIRWAYS_LOGO;
        }
        break;
      case STR_CONST.AMERICAN_AIRLINES:
        {
          icon = IMG_CONST.AMERICAN_AIRLINES_LOGO;
        }
        break;
    }
    return icon;
  },

  getBAClassesString(classSelected) {
    let classArray = ["economy", "premium_economy", "business", "first"];
    let travel_classes = "";
    for (i = 0; i < classSelected.length; i++) {
      if (classSelected[i]) {
        if (travel_classes !== "")
          travel_classes = `${travel_classes},${classArray[i]}`;
        else {
          travel_classes = `${classArray[i]}`;
        }
      }
    }
    return travel_classes;
  },

  getGeoDistance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 && lon1 && lat2 && lon2) {
      if (lat1 == lat2 && lon1 == lon2) {
        return 0;
      } else {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
          dist = dist * 1.609344;
        }
        if (unit == "N") {
          dist = dist * 0.8684;
        }
        return dist;
      }
    }
  },
  makeUpperCaseAfterSpace(str) {
    return str.replace(/ \s*([a-z])/g, function(d, e) {
      return " " + e.toUpperCase();
    });
  },

  getAirwaysDisplayName(airlineName) {
    airlineName = airlineName.replace(/_/g, " ");
    return (
      airlineName.charAt(0).toUpperCase() +
      module.exports.makeUpperCaseAfterSpace(airlineName).slice(1)
    );
  },

  getGoldFeatures() {
    return [
      `${STR_CONST.GOLD_ALERT_LIMIT} ${STR_CONST.ACTIVE_ALERTS_AT_ONCE}`,
      `${STR_CONST.INSTANT_TEXT} ${STR_CONST.DAILY_ALERTS}`,
      STR_CONST.WHERE_CAN_I_GO,
      STR_CONST.SMS_ALERTS,
      STR_CONST.PUSH_NOTIF_ALERTS,
      STR_CONST.IOS_ANDROID,
      STR_CONST.ADVANCE_ALERT_SETTING,
      STR_CONST.POINTS_AND_TAX_PRICING_INFO
    ];
  },
  getSilverFeatures() {
    return [
      `${STR_CONST.SILVER_ALERT_LIMIT} ${STR_CONST.ACTIVE_ALERTS_AT_ONCE}`,
      `${STR_CONST.HOURLY_TEXT} ${STR_CONST.DAILY_ALERTS}`,
      STR_CONST.WHERE_CAN_I_GO,
      STR_CONST.PUSH_NOTIF_ALERTS,
      STR_CONST.IOS_ANDROID,
    ];
  },
  getBronzeFeatures() {
    return [
      `${STR_CONST.BRONZE_ALERT_LIMIT} ${STR_CONST.ACTIVE_ALERTS_AT_ONCE}`,
      `${STR_CONST.DAILY_TEXT} ${STR_CONST.DAILY_ALERTS}`,
      STR_CONST.PUSH_NOTIF_ALERTS,
      STR_CONST.IOS_ANDROID,
    ];
  },

  getpolicies() {
    let policyArray = [
      {
        title: "FAQ",
        link: CONFIG.FAQ_URL,
      },
      {
        title: "Privacy Policy",
        link: CONFIG.PRIVACY_POLICY_URL,
      },
      {
        title: "Terms of Use",
        link: CONFIG.TERMS_CONDITIONS_URL,
      },
      {
        title: "Disclaimer",
        link: CONFIG.DISCLAIMER_URL,
      },
      {
        title: "Articles & News",
        link: CONFIG.BLOGS_URL,
      },
    ];
    return policyArray;
  },

  getCalendarLocals() {
    LocaleConfig.locales["us"] = {
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      monthNamesShort: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      dayNames: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
    };
  },

  getformattedDate(date) {
    const monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthNumberArray = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    let resData = date.split("-");
    let n = monthNumberArray.indexOf(resData[1]);
    dateString = `${resData[2]} ${monthArray[n]} ${resData[0]}`;
    return dateString;
  },
  getMapSearchData() {
    const locationData = [
      {
        name: "Manchester",
        code: "MAN",
        country_code: "GB",
        type: "airport",
        airports: [{ name: "Manchester", code: "MAN" }],
        country_name: "United Kingdom",
        city_name: "Manchester",
        latitude: 53.353744,
        longitude: -2.27495,
      },

      {
        name: "London",
        code: "LON",
        country_code: "GB",
        type: "city",
        country_name: "United Kingdom",
        city_name: "London",
        airports: [
          { name: "Gatwick", code: "LGW" },
          { name: "Heathrow", code: "LHR" },
          { name: "City", code: "LCY" },
          { name: "Luton", code: "LTN" },
          { name: "Southend", code: "SEN" },
          { name: "Stansted", code: "STN" },
        ],
        latitude: 51.148056,
        longitude: -0.190278,
      },

      {
        name: "Edinburgh",
        code: "EDI",
        country_code: "GB",
        type: "airport",
        airports: [{ name: "Edinburgh", code: "EDI" }],
        country_name: "United Kingdom",
        city_name: "Edinburgh",
        latitude: 55.95,
        longitude: -3.3725,
      },

      {
        name: "Cape Town Intl",
        code: "CPT",
        country_code: "ZA",
        type: "airport",
        airports: [{ name: "Cape Town Intl", code: "CPT" }],
        country_name: "South Africa",
        city_name: "Cape Town",
        latitude: -33.964806,
        longitude: 18.601667,
      },

      {
        name: "Durban Intl",
        code: "DUR",
        country_code: "ZA",
        type: "airport",
        airports: [{ name: "Durban Intl", code: "DUR" }],
        country_name: "South Africa",
        city_name: "Durban",
        latitude: -29.970089,
        longitude: 30.950519,
      },

      {
        name: "Johannesburg Intl",
        code: "JNB",
        type: "airport",
        country_code: "ZA",
        airports: [{ name: "Johannesburg Intl", code: "JNB" }],
        country_name: "South Africa",
        city_name: "Johannesburg",
        latitude: -26.139166,
        longitude: 28.246,
      },

      {
        name: "Port Elizabeth Intl",
        code: "PLZ",
        country_code: "ZA",
        type: "airport",
        airports: [{ name: "Port Elizabeth Intl", code: "PLZ" }],
        country_name: "South Africa",
        city_name: "Port Elizabeth",
        latitude: -33.984919,
        longitude: 25.617275,
      },
      {
        name: "Southampton",
        code: "SOU",
        country_code: "GB",
        type: "airport",
        airports: [{ name: "Southampton", code: "SOU" }],
        country_name: "United Kingdom",
        city_name: "Southampton",
      },
    ];

    return locationData;
  },

  async getImageInfo(url) {
    let data;
    await fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        data = new File([blob], "test.png", blob);
      })
      .catch((err) => (data = err));
    return data;
  },

  // getOnboardingData() {
  //   let onBoardingData = [
  //     {
  //       image: IMG_CONST.ON_BOARDING_RFF_LOGO,
  //       heading: STR_CONST.WELCOME_TO,
  //       subHeading: STR_CONST.REWARD_FLIGHT_FINDER,
  //       description: STR_CONST.RFF_DESCRIPTION,
  //     },
  //     {
  //       image: IMG_CONST.ON_BOARDING_FIND_FLIGHT,
  //       heading: STR_CONST.EASY_SEARCH,
  //       description: STR_CONST.EASY_SEARCH_DESCRIPTION,
  //     },
  //     {
  //       image: IMG_CONST.ON_BOARDING_CALENDAR,
  //       heading: STR_CONST.AVAILABILTY_HEADING,
  //       description: STR_CONST.AVAILABILTY_DESCRIPTION,
  //     },
  //     {
  //       image: IMG_CONST.ON_BOARDING_ALERT_SCREEN,
  //       heading: STR_CONST.DATES_NOT_AVAILABLE,
  //       description: STR_CONST.ALERT_DESCRIPTION,
  //     },
  //     {
  //       image: IMG_CONST.ON_BOARDING_LOCATION_MAP,
  //       heading: STR_CONST.SEE_WHERE_YOU_CAN_TRAVEL,
  //       description: STR_CONST.MAP_FEATURE_DESCRIPTION,
  //     },
  //     {
  //       image: IMG_CONST.ON_BOARDING_NOTIFICATION,
  //       heading: STR_CONST.RECEIVE_EMAILS,
  //       description: STR_CONST.RECEIVE_EMAILS_DESCRIPTION,
  //     },
  //     // {
  //     //   image: IMG_CONST.ON_BOARDING_SUBSCRIPTION,
  //     //   heading: STR_CONST.GET_REWARD_SEATS,
  //     //   description: STR_CONST.GET_REWARD_SEATS_DESCRIPTION,
  //     // },
  //   ];
  //   return onBoardingData;
  // },

  getOnboardingData(){
    let onBoardingData = [
      {
        image: IMG_CONST.SCREEN1,
        heading: STR_CONST.QUICKLY,
        description: STR_CONST.QUICKLY_DES,
      },
      {
        image: IMG_CONST.SCREEN2,
        heading: STR_CONST.DATES_NOT_AVAILABLE,
        description: STR_CONST.DATES_NOT_AVAILABLE_DES,
      },
      {
        image: IMG_CONST.SCREEN3,
        heading: STR_CONST.QUICKLY_TRAVLE,
        description: STR_CONST.QUICKLY_TRAVLE_DES,
      },
      {
        image: IMG_CONST.SCREEN4,
        heading: STR_CONST.GET_REWARDS,
        description: STR_CONST.GET_REWARDS_DES,
      },
    ];
    return onBoardingData;
  },
  
  storeCountryData(list) {
    let countryArray = [];
    for (i = 0; i < STR_CONST.countryPhoneOptions.length; i++) {
      list.map((item) => {
        if (item.label.includes(STR_CONST.countryPhoneOptions[i]))
          countryArray.push(item);
      });
    }
    return countryArray;
  },
  getCountryCodes() {
    let countryData = [
      {
        key: 228,
        image: 194,
        label: "United Kingdom",
        dialCode: "+44",
        iso2: "GB",
      },
      {
        key: 229,
        image: 345,
        label: "United States",
        dialCode: "+1",
        iso2: "US",
      },
      {
        key: 97,
        image: 219,
        label: "India",
        dialCode: "+91",
        iso2: "IN",
      },
      { key: 36, image: 155, label: "Canada", dialCode: "+1", iso2: "CA" },
      {
        key: 122,
        image: 249,
        label: "Luxembourg",
        dialCode: "+352",
        iso2: "LU",
      },
      { key: 166, image: 300, label: "Paraguay", dialCode: "+595", iso2: "PY" },
      { key: 4, image: 120, label: "Andorra", dialCode: "+376", iso2: "AD" },
      {
        key: 75,
        image: 290,
        label: "French Polynesia",
        dialCode: "+689",
        iso2: "PF",
      },
      { key: 154, image: 279, label: "Nigeria", dialCode: "+234", iso2: "NG" },
      {
        key: 197,
        image: 359,
        label: "South Africa",
        dialCode: "+27",
        iso2: "ZA",
      },
      {
        key: 58,
        image: 176,
        label: "Denmark",
        dialCode: "+45",
        iso2: "DK",
      },
      {
        key: 174,
        image: 305,
        label: "Russia",
        dialCode: "+7",
        iso2: "RU",
      },
      {
        key: 121,
        image: 248,
        label: "Lithuania",
        dialCode: "+370",
        iso2: "LT",
      },
      {
        key: 103,
        image: 217,
        label: "Israel",
        dialCode: "+972",
        iso2: "IL",
      },
      {
        key: 136,
        image: 272,
        label: "Mexico",
        dialCode: "+52",
        iso2: "MX",
      },
      { key: 191, image: 312, label: "Singapore", dialCode: "+65", iso2: "SG" },
      { key: 127, image: 273, label: "Malaysia", dialCode: "+60", iso2: "MY" },
      {
        key: 235,
        image: 353,
        label: "Vietnam",
        dialCode: "+84",
        iso2: "VN",
      },
      {
        key: 172,
        image: 301,
        label: "Qatar",
        dialCode: "+974",
        iso2: "QA",
      },
      {
        key: 227,
        image: 121,
        label: "United Arab Emirates",
        dialCode: "+971",
        iso2: "AE",
      },
      {
        key: 52,
        image: 212,
        label: "Croatia",
        dialCode: "+385",
        iso2: "HR",
      },
      { key: 230, image: 346, label: "Uruguay", dialCode: "+598", iso2: "UY" },
      {
        key: 106,
        image: 228,
        label: "Japan",
        dialCode: "+81",
        iso2: "JP",
      },
      {
        key: 15,
        image: 141,
        label: "Bahrain",
        dialCode: "+973",
        iso2: "BH",
      },
      {
        key: 206,
        image: 311,
        label: "Sweden",
        dialCode: "+46",
        iso2: "SE",
      },
      {
        key: 104,
        image: 224,
        label: "Italy",
        dialCode: "+39",
        iso2: "IT",
      },
      {
        key: 200,
        image: 185,
        label: "Spain",
        dialCode: "+34",
        iso2: "ES",
      },
      {
        key: 43,
        image: 165,
        label: "China",
        dialCode: "+86",
        iso2: "CN",
      },
      { key: 73, image: 192, label: "France", dialCode: "+33", iso2: "FR" },
      {
        key: 25,
        image: 135,
        label: "Bosnia and Herzegovina",
        dialCode: "+387",
        iso2: "BA",
      },
      {
        key: 108,
        image: 227,
        label: "Jordan",
        dialCode: "+962",
        iso2: "JO",
      },
      {
        key: 201,
        image: 245,
        label: "Sri Lanka",
        dialCode: "+94",
        iso2: "LK",
      },
      {
        key: 207,
        image: 160,
        label: "Switzerland",
        dialCode: "+41",
        iso2: "CH",
      },
      {
        key: 194,
        image: 314,
        label: "Slovenia",
        dialCode: "+386",
        iso2: "SI",
      },
      {
        key: 2,
        image: 179,
        label: "Algeria",
        dialCode: "+213",
        iso2: "DZ",
      },
      { key: 234, image: 350, label: "Venezuela", dialCode: "+58", iso2: "VE" },
      { key: 101, image: 216, label: "Ireland", dialCode: "+353", iso2: "IE" },
      {
        key: 173,
        image: 303,
        label: "Romania",
        dialCode: "+40",
        iso2: "RO",
      },
      {
        key: 99,
        image: 222,
        label: "Iran",
        dialCode: "+98",
        iso2: "IR",
      },
      {
        key: 115,
        image: 250,
        label: "Latvia",
        dialCode: "+371",
        iso2: "LV",
      },
      {
        key: 220,
        image: 338,
        label: "Turkey",
        dialCode: "+90",
        iso2: "TR",
      },
      { key: 170, image: 298, label: "Portugal", dialCode: "+351", iso2: "PT" },
      { key: 98, image: 215, label: "Indonesia", dialCode: "+62", iso2: "ID" },
      {
        key: 56,
        image: 173,
        label: "Czech Republic",
        dialCode: "+420",
        iso2: "CZ",
      },
      { key: 130, image: 268, label: "Malta", dialCode: "+356", iso2: "MT" },
      {
        key: 125,
        image: 257,
        label: "Madagascar",
        dialCode: "+261",
        iso2: "MG",
      },
      {
        key: 213,
        image: 331,
        label: "Thailand",
        dialCode: "+66",
        iso2: "TH",
      },
      {
        key: 167,
        image: 289,
        label: "Peru",
        dialCode: "+51",
        iso2: "PE",
      },
      {
        key: 152,
        image: 280,
        label: "Nicaragua",
        dialCode: "+505",
        iso2: "NI",
      },
      { key: 42, image: 163, label: "Chile", dialCode: "+56", iso2: "CL" },
      {
        key: 72,
        image: 187,
        label: "Finland",
        dialCode: "+358",
        iso2: "FI",
      },
      { key: 105, image: 226, label: "Jamaica", dialCode: "+1876", iso2: "JM" },
      {
        key: 193,
        image: 316,
        label: "Slovakia",
        dialCode: "+421",
        iso2: "SK",
      },
      {
        key: 159,
        image: 282,
        label: "Norway",
        dialCode: "+47",
        iso2: "NO",
      },
      {
        key: 27,
        image: 149,
        label: "Brazil",
        dialCode: "+55",
        iso2: "BR",
      },
      {
        key: 164,
        image: 288,
        label: "Panama",
        dialCode: "+507",
        iso2: "PA",
      },
      {
        key: 169,
        image: 294,
        label: "Poland",
        dialCode: "+48",
        iso2: "PL",
      },
      { key: 11, image: 131, label: "Australia", dialCode: "+61", iso2: "AU" },
      {
        key: 210,
        image: 341,
        label: "Taiwan",
        dialCode: "+886",
        iso2: "TW",
      },
      {
        key: 16,
        image: 137,
        label: "Bangladesh",
        dialCode: "+880",
        iso2: "BD",
      },
      { key: 62, image: 180, label: "Ecuador", dialCode: "+593", iso2: "EC" },
      {
        key: 63,
        image: 182,
        label: "Egypt",
        dialCode: "+20",
        iso2: "EG",
      },
      {
        key: 12,
        image: 130,
        label: "Austria",
        dialCode: "+43",
        iso2: "AT",
      },
      {
        key: 94,
        image: 210,
        label: "Hong Kong",
        dialCode: "+852",
        iso2: "HK",
      },
      {
        key: 79,
        image: 174,
        label: "Germany",
        dialCode: "+49",
        iso2: "DE",
      },
      { key: 46, image: 166, label: "Colombia", dialCode: "+57", iso2: "CO" },
      {
        key: 116,
        image: 242,
        label: "Lebanon",
        dialCode: "+961",
        iso2: "LB",
      },
      {
        key: 82,
        image: 205,
        label: "Greece",
        dialCode: "+30",
        iso2: "GR",
      },
      { key: 8, image: 128, label: "Argentina", dialCode: "+54", iso2: "AR" },
      {
        key: 134,
        image: 269,
        label: "Mauritius",
        dialCode: "+230",
        iso2: "MU",
      },
      {
        key: 67,
        image: 181,
        label: "Estonia",
        dialCode: "+372",
        iso2: "EE",
      },
      {
        key: 168,
        image: 292,
        label: "Philippines",
        dialCode: "+63",
        iso2: "PH",
      },
      {
        key: 95,
        image: 214,
        label: "Hungary",
        dialCode: "+36",
        iso2: "HU",
      },
      {
        key: 226,
        image: 343,
        label: "Ukraine",
        dialCode: "+380",
        iso2: "UA",
      },
      {
        key: 19,
        image: 138,
        label: "Belgium",
        dialCode: "+32",
        iso2: "BE",
      },
      {
        key: 38,
        image: 148,
        label: "Caribbean Netherlands",
        dialCode: "+599",
        iso2: "BQ",
      },
      {
        key: 161,
        image: 293,
        label: "Pakistan",
        dialCode: "+92",
        iso2: "PK",
      },
      {
        key: 143,
        image: 252,
        label: "Morocco",
        dialCode: "+212",
        iso2: "MA",
      },
      {
        key: 148,
        image: 283,
        label: "Nepal",
        dialCode: "+977",
        iso2: "NP",
      },
      {
        key: 219,
        image: 336,
        label: "Tunisia",
        dialCode: "+216",
        iso2: "TN",
      },
      {
        key: 151,
        image: 286,
        label: "New Zealand",
        dialCode: "+64",
        iso2: "NZ",
      },
    ];
    return countryData;
  },
  getISOCode(dialCode, countries) {
    let isoCode = "";
    countries.map((item) => {
      if (item.dialCode == `+${dialCode}`) {
        isoCode = item.iso2;
      }
    });
    return isoCode;
  },

  getClassesDisplayName(travelClass) {
    let displayName = "";
    switch (travelClass) {
      case "economy":
        {
          displayName = STR_CONST.ECONOMY;
        }
        break;
      case "premium_economy":
        {
          displayName = STR_CONST.PREMIUM_ECONOMY;
        }
        break;
      case "business":
        {
          displayName = STR_CONST.BUSINESS;
        }
        break;
      case "first":
        {
          displayName = STR_CONST.FIRST;
        }
        break;
    }
    return displayName;
  },

  getClassesColor(travelClass) {

    let displayName = "";
    switch (travelClass) {
      case "economy":
        {
          displayName = colours.blue;
        }
        break;
      case "premium_economy":
        {
          displayName = colours.yellow
        }
        break;
        case "premium":
          {
            displayName = colours.yellow
          }
          break;

      case "business":
        {
          displayName = colours.purple;
        }
        break;
      case "first":
        {
          displayName = colours.pink;
        }
        break;
    }
    return displayName;
  },

  getDateFormate(date) {
    var dateString = moment.unix(date / 1000).format("MMM DD, hh:mm A");
    return dateString;
  },

  getLocationName(locationCode, locationsArray) {
    let locationData = {};
    locationsArray &&
      locationsArray.map((location) => {
        if (location.code == locationCode) {
          locationData = location;
        }
      });
    return locationData;
  },

  getLocationNameWithCode(locationObject) {
    let code = "";
    code = locationObject.airports
      .map((item, index) => {
        return item.code;
      })
      .join(",");
    let fullName = `${locationObject.city_name} (${code})`;
    return fullName;
  },

  getAirlinesCode(airlines) {
    let airlineCode;
    switch (airlines) {
      case "british-airways":
        {
          airlineCode = "BA";
        }
        break;
      case "american-airways":
        {
          airlineCode = "AA";
        }
        break;
    }
    return airlineCode;
  },
  

};
