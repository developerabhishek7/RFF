/**
 * All String Constants Comes here
 */
import { Dimensions } from "react-native";
import * as IMAGE_CONST from "./ImageConst";

const { height, width } = Dimensions.get("window");

// Current Screen Constatnts
export const CURRENT_SCREEN_HEIGHT = height;
export const CURRENT_SCREEN_WIDTH = width;

// Design Screen Constatnts
export const DEFAULT_SCREEN_HEIGHT = 667;
export const DEFAULT_SCREEN_WIDTH = 375;

// Paggination Constants
export const RECORDS_PER_PAGE = 50;
export const ONBOARDING_SLIDE_LIMIT = 3;
export const ONBOARDING_PAGINATION_INITIAL_INDEX = 0;

export const INITIAL_ISO_CODE = "gb";
export const INITIAL_PNUMBER_CODE = "+44";
export const MINIMUM_DATE_AVAILABILTY_COUNT = 4;

// Style Constants
export const POSITION_ABSOLUTE = "absolute";
export const POSITION_RELATIVE = "relative";
export const CENTER = "center";
export const UNDEFINED = "undefined";
export const SPACE_BETWEEN = "space-between";
export const FLEX_START = "flex-start";
export const FLEX_END = "flex-end";
export const ROW = "row";
export const COLUMN = "column";
export const WINDOW = "window";
export const PLATFORM_ANDROID = "android";
export const PLATFORM_IOS = "ios";
export const POSITION_RIGHT = "right";
export const POSITION_LEFT = "left";
export const SPACE_AROUND = "space-around";
export const STRETCH = "stretch";
export const CONTAIN = "contain";
export const BOLD = "bold";
export const JUSTIFY = "justify";
export const NO_ALERT_YET = "No Alerts have been set" 
export const HELP = "Help"
// Login and SignUp screen
export const EMAIL = "Email";
export const COUNTRY = "Country";
export const PASSWORD = "Password";
export const OLD_PASSWORD = "Old Password";
export const NEW_PASSWORD = "New Password";
export const SAVE = "Save";
export const UPDATE = "Update";
export const CHANGE_PASSOWRD = "Change Password";
export const SET_PASSWORD = "Set Password";
export const FORGOT_PASSWORD = "Forgot Password?";
export const SIGN_IN = "Sign In";
export const DONT_HAVE_ACCOUNT = `Don't have an account?`;
export const SIGN_UP = `Sign Up`;
export const PLEASE_ENTER_VALID_EMAIL = `Please enter valid email!`;
export const PLEASE_ENTER_VALID_PASSWORD = `Password should be atleast of 6 characters!`;
export const PLEASE_ENTER_FIRST_NAME = `Please enter first name!`;
export const PLEASE_ENTER_LAST_NAME = `Please enter last name!`;
export const PLEASE_ENTER_ADDRESS = `Please enter valid address!`;
export const PLEASE_ENTER_NAME = `Please enter valid name!`;
export const PLEASE_ENSURE = `Please ensure password and confirm password match`;
export const OR_SIGN_IN = `Or sign-in with`;
export const FIRST_NAME = `First Name`;
export const LAST_NAME = `Last Name`;
export const ADDRESS_LINE_1 = `Address Line 1`;
export const ADDRESS_LINE_2 = `Address Line 2`;
export const CONFIRM_PASSWORD = `Confirm Password`;
export const SIGN_UP_TEXT = "Sign Up";
export const OR_SIGN_UP = `Or sign-up with`;
export const ALREADY_HAVE_AN_ACCOUNT = `You already have an account? `;
export const NOTIFICATION_PERMISSION = `Please turn on Notifications from Phone Settings`;
export const SKIP_FOR_NOW = "Skip For Now";
export const PRIVACY_POLICY = "Privacy Policy";
export const TERMS_OF_USE = "Terms of use";
export const PASSWORD_INSTRUCTION = "Password must contain the following:";

// Social Login Constants
export const FACEBOOK_LOGIN_CANCELLED = `Facebook signin cancelled!`;
export const GOOGLE_LOGIN_CANCELLED = `Google signin cancelled!`;

// Alert Screen
export const WANT_YOUR_ALERT = `Want your alert on your `;
export const TURN_ON_NOTIFICATIONS_MSG = `Turn on notifications and we'll push your\nalerts straight to your device. No need to\ncheck your emails!`;
export const TURN_ON_NOTIFICATIONS_BUTTON = `Turn On Notifications`;
export const TURN_ON_NOTIFICATIONS_BUTTON_DOT = `Turning On Notifications...`;
export const CREATE_ALERT = "Create Alert";
export const NO_NOTIFICATION_YET = "No Notifications Yet!";
export const NO_NOTIFICATION_DESCI = `We’ll notify you when there is something new`;
export const CANCEL_ALERT = `Are you sure you want to delete this Alert?`;
export const CANCEL_ALERT_ERROR = `"We couldn't cancel your alert. Please make sure you're connected to the internet, and then try again."`;
export const ALERT_CREATED = `Your Alert is now setup. Happy flying!`;
export const CREATE_ALERT_MSG = `If your preferred date is not available, then set up a seat alert.`;
export const CANCEL_ALERT_SUCCESS_MSG = `Your alert has been cancelled.`;
export const CANCEL_ALERT_SUCCESS_SUBTEXT =
  "Feel free to set it up again if you change your mind.";
export const DELETE_ALERT = "Delete Alert";
export const DEPARTURE_DATE = "Departure Date";
export const ORIGIN = "Origin";
export const DESTINATION = "Destination";
export const DESTINATIONS = "Destinations";
export const SIGNING_INFO = `By signing up for an account with\n Reward Flight Finder you agree to our \n` ;

//Setting Screen

export const DISABLE_NOTIFICATION_ERROR = `We couldn't disable notifications. Please try again while you're connected to the internet.`;

//Find Flight Screen Constants

export const DONT_KNOW_WHERE_TO_GO = `Don't know where you want to go?`;
export const I_KNOW_WHERE_TO_GO = `I know where I want to go`;
export const WHERE_ARE_YOU_FLYING_FROM = `Where are you flying from?`;
export const WHERE_ARE_YOU_FLYING_TO = `Where are you flying to?`;
export const LOCATION_NOT_AVAILABLE = `This location is not available.`;
export const AIRLINE_NOT_AVAILABLE = `This airline is not available.`;
export const MAP_SEARCH_UPGRADE_MESSAGE = `Upgrade to Silver or Gold membership to use the World Map search`;
export const NO_AVAILIBILTY = `No availabilty found. Please update your search parameters`;

export const SELECT_AIRLINE_MESSAGE = "Please Select Airline and Membership";
export const SELECT_DEPARTURE_AIRPORT_MESSAGE = "Please departure city/Airport";
export const SELECT_ARRIVAL_AIRPORT_MESSAGE = "Please arrival city/Airport";
export const SELECT_CLASS_MESSAGE = "Please select class Type";
export const SELECT_PASSENGERS_COUNT = "Please select number of Passengers";
export const NEAREST_AIRPORT = "Nearest Airport";
export const BA_SCHEDULED_FLIGHTS = "BA Scheduled Flights";
export const CLICK_TO_SEE_FLIGHT_DETAILS = "Click to see flight details";

//Calender Screen

export const SEAT_AVAILABILITY = `Seat Availability`;
export const PEAK_FARE = `Peak Fare`;
export const OFF_PEAK_FARE = `Off-Peak Fare`;
export const HIGHLIGHT_OFF_PEAK = `Highlight Off-Peak`;
export const OUT_BOUND_SEATS = `Departure Seats`;
export const RETURN_SEATS = `Return Seats`;
export const DEPARTURE_DATE_RANGE = `Departure Date Range`;
export const RETURN_DATE_RANGE = `Return Date Range`;
export const VERIFY_EMAIL = `Please verify your email to create alerts. `;
export const SELECT_DEPARTURE_DATE = `Please select departure date`;
export const SELECT_RETURN_DATE = `Please select return date`;
export const ALERT_REACH_LIMIT = "You have reached your limit of Active Alerts."
export const CREATE_ALERT_LIMIT = `You have reached your limit of Active Alerts. Upgrade your membership to create more Alerts`;
export const CREATE_ALERT_LIMIT_IOS = `You have reached your limit of Active Alerts. Upgrade your membership to create more Alerts`;
export const CREATE_ALERT_LIMIT_GOLD = `You have reached max limit of Active Alerts. Please contact support for more details`;
export const START_DATE = `Start Date`;
export const END_DATE = `End Date`;
export const SUBMIT_ALERT = `Submit Alert`;
export const CHECK_CIRCLE = `check-circle`;
export const CHECK_EMPTY_CIRCLE = `checkbox-blank-circle-outline`;
export const AVIOS_POINT_INFO = `Avios point pricing may be inaccurate.We’re working on a fix.`;
export const CLICK_HERE_FOR_INFO = `Click here for more options & information`;
export const ONLY_ONE_FLIGHT_SCHEDULE =  `One flight scheduled`;
export const MULTIPLE_FLIGHT_SCHEDULE = `Multiple Flights scheduled`
export const CLICK_ON_THE_DATES_TO_SEE_DETAILS = `Click here to see flight details`;


//Password Check 
export const ONE_LOWERCASE_TEXT = `At least one lowercase letter`;
export const ONE_UPPERCASE_TEXT = `At least one capital (uppercase) letter`;
export const ONE_NUMERIC_TEXT = `At least one number`;
export const ATLEAST_EIGHT_CHARCHTERS = `Minimum 8 characters`;
// Font Family
export const appFonts = {
  INTER_REGULAR: "Inter-Regular",
  INTER_SEMI_BOLD: "Inter-SemiBold",
  INTER_BOLD: "Inter-Bold",
  SITIKA_REGULAR:"sitka-small",
  SITIKA_BOLD:"sitka-medium",
  SITIKA_SEMIBOLD:"sitka-large",
};

// Screen Name Constants
export const ALERT_SCREEN = "Alerts";
export const SETTING_SCREEN = "Settings";
export const NO_NETWORK_SCREEN = "NoNetworkScreen";
export const PROFILE_SCREEN = "ProfileScreen";
export const NOTIFICATIONS_SCREEN = "NotificationsScreen";
export const NOTIFICATION_DETAIL_SCREEN = "NotificationDetailScreen";
export const MEMBERSHIP_SCREEN = "MembershipContainerScreen";
export const PRICING_SCREEN = "PricingContainerScreen";
export const FIND_FLIGHT_SCREEN = "FindFlightContainerScreen";
export const CREATE_ALERT_SCREEN = "CreateAlertCalenderScreen";
export const AIRLINE_MEMBERSHIP_SCREEN = "airlineMembershipScreen";
export const LOCATION_LIST_SCREEN = "sourceDestinationListScreen";
export const CALENDAR_SCREEN = "CalenderContainerScreen";
export const EDIT_ALERT = "EditAlert";
export const EDIT = "Edit";
export const MAP_SEARCH_SCREEN = "MapSearchContainerScreen";
export const MANAGE_CONTACT_SCREEN = "ManageContactDetails";
export const MORE_SCREEN = "MoreComponentScreen";
export const COUNTRY_LIST_SCREEN = "CountryListSCreen";
export const CHANGE_PASSWORD_SCREEN = "ChangePasswordScreen";
export const NOTIFICATION_SETTINGS_SCREEN = "NotificationSettingsScreen";
export const AIRLINE_TIER_SCREEN = "airlineTierScreen";
export const PROFILE_DETAIL_SCREEN = "ProfileDetailsScreen";
export const USER_PROFILE_DETAIL_SCREEN = "UserProfileScreen";
export const UPDATE_PROFILE_SCREEN = "UpdateProfileScreen";
export const HELP_SCREEN = "HelpScreen";

export const UPGRADE_TO_ADD_SECONDARY_EMAIL = "Upgrade to add secondary email addresses"

export const UPDATE_EMAILS = "Update emails"
// Screen Title Constants
export const ALERT_SCREEN_TITLE = "My Alerts";
export const SETTING_SCREEN_TITLE = "Settings";
export const NOTIFICATONS_SCREEN_TITLE = "Notifications";
export const PRICING_SCREEN_TITLE = "Our Plans";
export const MORE_TITLE = "More";
export const MEMBERSHIP_TITLE = "Membership";
export const PROFILE_SCREEN_TITLE = "My Profile";
export const EDIT_ALERTS_TITLE = "Edit Alert";
export const FIND_FLIGHT_TITLE = "Find Flights";
export const MAP_SEARCH_TITLE = "World Map Search";
export const MANAGE_CONTACT_DETAILS = "Manage Contact Details";
export const NOTIFICATION_SETTINGS = "Alert Notification Settings";
export const PERSONAL_INFO = "Personal Info";
export const UPDATE_INFO = "Update Profile";

//Proflie Screen
export const REMOVE_IMAG_FAILED = "Remove Image failed. Please try again later";
export const IMAGE_UPLOAD_FAILED =
  "Image upload failed. Please try again later";
export const MANAGE_CONTACT = "Manage Contact Details";
export const AVAILABILITY_ALERTS = "Availability alerts";
export const KEEP_IN_TOUCH = "Keep In Touch";
export const KEEP_IN_TOUCH_SUBTEXT =
  "Let us know if you’re happy for us to include you in our other newsletters and product updates.";
export const SMS_ALERT_NOTIFICATION = "SMS Alert Notifications";
export const EMAIL_ALERT_NOTIFICATION = "Email Alert Notifications";
export const PUSH_NOTIFICATION = "App Alert Notifications";
export const PASSWORD_CHANGE = "Password Changed Successfully";
export const ADD_CONTACT = "Please add contact number from manage contact";
export const VERIFY_NUMBER = `Please verify your Number first`;
export const EDIT_FIRST_NAME = `Edit Name`;
export const PASSWORD_NOT_MATCH = `Passwords do not match.`;
export const CHANGE_PASSWORD = `Change Password`;
export const REMOVE_PHOTO = `Remove Photo`;
export const NEWSLETTER = `Newsletters`;
export const OFFERS = `Offers`;
export const ASSOCIATE_OFFERS = `Associate Offers`;
export const SEARCH_COUNTRY = `Search Country`;
export const SEARCH_LOCATION = `Search Location`;
export const STATE = "County/State";
export const CITY = "City";
export const POST_CODE = `Postal/Zip Code`;
export const PREFFERED_DEPARTURE = `My Home Airport`;
export const AVG_NUMBER_OF_FLIGHT =   "Average number of return fights"
export const TAKEN_ANNUALLY = "taken annually"
export const AGE_BAND = `Age Band`;
export const GENDER = `Gender`;
export const APPROX_FLIGHT_NUMBER = `Average number of return flights \ntaken annually`;
export const HOW_LIKELY_TO_TRAVEL_ABROAD = `Do you plan to travel abroad in the next 12 months?`;
export const DO_YOU_WANT_TO_TRAVEL = "Do you plan to travel abroad in"
export const NEXT_TWELVE_MONTH = "the next 12 months?"

export const EMAIL_NOTIFICATION_DETAILS = `Keep set to always ‘on’ to ensure you don’t miss any reward flight notifications.`;
export const SMS_NOTIFICATION_DETAILS = `Always get alerts, even with limited access to mobile data & wifi`;
export const PUSH_NOTIFICATION_DETAILS = `Always get alert notifications on the app`;
export const SAVE_CHANGES = "Save Changes"
// Manage Contact Detail Screen
export const ADD_MOBILE_NO = "Add mobile number";
export const UPDATE_EMAIL = "Update Email";
export const ADD_SECONDARY_EMAIL = "Add additional email";
export const PRIMARY_EMAIL_INFO =
  "Designate additional email to receive alerts. You can only login with your primary email";
export const ENTER_OTP = "Enter the 4 digits OTP via SMS on your phone";
export const PLEASE_ENTER_VALID_OTP = `Please enter valid OTP!`;
export const PLEASE_ENTER_VALID_NUMBER = `Please enter valid Number.`;

export const VERIFICATION_OTP_SENT = `Verification OTP Sent.`;
export const SET_PRIMARY = "Set as primary";
// export const RESEND_VERIFICATION_CODE = `Resend Verification Code`;
export const RESEND_VERIFICATION_CODE = `Verify Email`;
export const EMAIL_EXIST = `Email already added`;
export const PRIMARY_TEXT = `Primary`;
export const UNVERIFIED_TEXT = `Unverified`;
export const APPLE_EMAIL = "privaterelay.appleid.com";
export const HIDDEN_EMAIL_INFO =
  "Since you have not shared apple email id with us, please use this automatic generated email as your sign in credentials.";
export const ADD_TEXT = `Add`;
export const RESEND_TEXT = `Resend`;
export const VERIFY_TEXT = `Verify`;
export const SEND_VERIFICATION_CODE = `Send Verification Code`;
export const VERIFICATION_CODE = `Verification Code`;
export const TIMER_LIMIT = 20;

export const DATE_SOULD_BE_GREATER = "Date should be greater than today!"

//PricingPage
export const SELECT_YEARLY_PLAN = `Select a yearly plan, and get `;
export const TWO_MONTHS_FREE = `2 Months Free`;
export const LOCAKDOWN_PROMOTION_HEADING = ` Post Lockdown Promotion`;
export const LOCAKDOWN_PROMOTION_DESCRIPTION = ` To celebrate the travelling restart, we’ve introduced a discount on our new Gold Plan for a limited time. Save 50% for the lifetime of your Gold membership, after your 14 Day Free Trial. If you downgrade, and the promotion is over, you won't be able to resubscribe at the discounted price. `;
export const TRIAL_TEXT = "Start 7 Day Free Trial";
export const BILLED_YEARLY = " billed annualy";
export const BILLED_MONTHLY = " billed monthly";
export const WHERE_CAN_I_GO_TEXT = `"Where Can I Go"`;
export const CURRENT_PLAN = "Current Plan";
export const SUBSCRIBE = "Subscribe";
export const SILVER_MONTHLY = "elite-plan-pound-monthly";
export const SILVER_YEARLY = "elite-plan-pound-yearly";
export const ACTIVE_ALERTS = "Active Alerts at Once";
export const PUSH_NOTIFICATION_TEXT = "Push Notification";
export const SMS_TEXT = "SMS";
export const PER_MONTH = "/month";
export const MONTHLY_TEXT = "Monthly";
export const BRONZE_TEXT = "Bronze";
export const SILVER_TEXT = "Silver";
export const GOLD_TEXT = "Gold";
export const INSTANTLY = "Instantly";
export const GO_TO_TOP = "Go to TOP";
export const FREE_TEXT = "Free";
export const SILVER_MONTHLY_PRICE = "£2.99";
export const SILVER_YEARLY_PRICE = "£30";
export const GOLD_MONTHLY_PRICE = "£9.99";
export const GOLD_YEARLY_PRICE = "£99.99";
export const DAILY_TEXT = "Daily";
export const YEARLY_TEXT = "yearly";
export const HOURLY_TEXT = "Hourly";
export const INSTANT_TEXT = "Instant";
export const GOLD_ALERT_LIMIT = 20;
export const SILVER_ALERT_LIMIT = 5;
export const BRONZE_ALERT_LIMIT = 1;
export const UNLIMITED = "Unlimited";
export const AIRLINE_SERACHES = "Airline Searches";
export const PRICING_CARD_SHADOW_OPACITY = 0.2;

export const BRONZE_PLAN_ID = "bronze-plan";
export const SILVER_MONTHLY_PLAN_ID = "elite-plan-pound-monthly";
export const SILVER_YEARLY_PLAN_ID = "elite-plan-pound-yearly";
export const GOLD_MONTHLY_PLAN_ID = "gold-plan-gbp-monthly-launch";
export const GOLD_YEARLY_PLAN_ID = "gold-plan-yearly-launch-promotion";

//Onboarding Screen
export const SINGLE_SEARCH_TEXT = "See A Year Ahead With A Single Search";
export const SEAT_ALERT_TEXT = "Instant Seat Alerts";
export const DISCOVER_LOCATION_TEXT = "Discover Where You Can Go";
export const SINGLE_SEARCH_SUBTEXT =
  "See reward seat availability for the next year";
export const SEAT_ALERT_SUBTEXT =
  "Be the first to know when seats become available";
export const DISCOVER_LOCATION_SUBTEXT =
  "Use the map to view global reward flight availability";
export const NEXT = "Next";
export const SKIP = "Skip";

// export const WELCOME_TO = "Welcome to";
// export const REWARD_FLIGHT_FINDER = "Reward Flight Finder";
// export const RFF_DESCRIPTION = `Reward Flight Finder gives you up-to-date
// reward seat availability. We find the seats you want, and alert you when seats
// become available.`;

// export const EASY_SEARCH = "Easily search any route";
// export const EASY_SEARCH_DESCRIPTION =
//   "We support all direct BA operated routes";

// export const AVAILABILTY_HEADING = `See entire year’s 
// availability for any route`;
// export const AVAILABILTY_DESCRIPTION = "See all availability with one click";

// export const DATES_NOT_AVAILABLE = `Dates not available?
// Set up an alert!`;
// export const ALERT_DESCRIPTION = `We’ll check once daily for free, and notify 
// you if seats open up`;

// export const SEE_WHERE_YOU_CAN_TRAVEL = `See where you can travel`;
// export const MAP_FEATURE_DESCRIPTION = `Find all available routes from a given destination`;

// export const RECEIVE_EMAILS = `Receive alerts by email 
// or SMS`;
// export const RECEIVE_EMAILS_DESCRIPTION = `Receive alerts wherever you are`;

// export const GET_REWARD_SEATS = `Get the reward seats 
// you deserve`;
// export const GET_REWARD_SEATS_DESCRIPTION = `Increase your chances with Reward Flight Finder`;

export const SELECT_YOUR_AIRLINE_MEMBERSHIP = "Select Your Airline Membership Tier"
export const QUICKLY = `Quickly & easily search any route`
export const QUICKLY_DES = `We support all direct BA operated routes`

export const DATES_NOT_AVAILABLE = `Dates not available? Set up an Alert!`
export const DATES_NOT_AVAILABLE_DES = `We'll check once daily for free, and notify you if seats open up`

export const QUICKLY_TRAVLE = `Quickly see where you can travel`
export const QUICKLY_TRAVLE_DES = `Find all available routes from a given destination`

export const GET_REWARDS = `Get the reward seats you deserve`
export const GET_REWARDS_DES = `Increase your chances with Reward Flight Finder`

export const CITIES_WITH_MULTIPLE_AIRPOTS =  "Cities with multiple airports"
export const CITIES_WITH_SINGLE_AIRPOTS = "Cities with one airport"

export const ADD_MOBILE_NO_TO_RECIEVE_SMS_ALERTS = " Add mobile number to receive SMS alerts"

export const DO_YOU_HAVE_SCREENSHOT =  "Do you have a screenshot?"
export const MAX_DAY_ALLOWED =   "Max 3 allowed"
export const MESSAGE_ABOUT_ISSUE = "Message about the issue"
export const PLEASE_WRITE_MESSAGE = "Please enter message"
export const ATTACH  = "Attach"

export const SELECT_SUBJECT =  "Select Subject"
export const PLEASE_SELECT_SUBJECT =  "Please Select Subject"
export const SUBMIT =  "Submit"
//Membership Page
export const DAILY_ALERTS = "Alert Notifications";
export const EMAIL_ALERTS = "Email Alerts";
export const PUSH_NOTIF_ALERTS = "Push Notification Alerts";
export const IOS_ANDROID = "iOS & Android App";
export const WHERE_CAN_I_GO = "“Where can I go” Search";
export const SMS_ALERTS = "SMS Alerts";
export const UPGRADE_PLAN =
  "To upgrade or make changes to your subscription, please visit website.";
export const BRONZE_MEMBER = "Bronze Member";
export const BRONZE = "Bronze";
export const SILVER_MEMBER = "Silver Member";
export const SILVER = "Silver";
export const GOLD_MEMBER = "Gold Member";
export const GOLD = "Gold";
export const VIEW_BILLING_DATA = "View Billing Data";
export const CANCEL_TRIAL = "Cancel Trial";
export const CHANGE_PLAN = "Change Plan";
export const ACTIVE_ALERTS_AT_ONCE = "active Alerts included";
export const FREE_TRIAL_DAYS_LEFT = "days left of free trial";

//Drawer Page
export const SEARCH_REWARD = "Search Reward Flights";
export const HELLO = "Hello!";
export const RFF = "Reward Flight Finder";
export const LOGOUT = "Logout";
export const VERIFY_EMAIL_MESSAGE = "Click here to verify your email address";

// Notification Screen
export const CHECK_AVAILABILITY =
  "Check availability still exists on our calendar page";
export const CHECK_AVAILABILITY_ON_BA =
  "If it does, check the availability also exists on BA.com";
export const BOOK_IMMEDIATLY = "If your seats are there - book immediately!";
export const MISSING_AVAILABILITY =
  "If you can't see the seats - either the availability has disappeared, or there’s a problem on our end \nHappy flying!";
export const CHECK_ON_BA = "Check on BA.com";
export const BOOK_ON_BA = "Book on BA";
export const AVAILABILITY_CHANGES = "Availability Changes Quickly";
export const DELAY_ALERT =
  "For the best chance of snapping up these reward seats book now";
export const STEPS_TO_BOOK = "Snag those seats: ";
export const DATES_AVAILABLE = "These dates have just become available for your Alert";
export const INBOUND = "Inbound";
export const OUTBOUND = "Outbound";
export const NOTIFICATION = "NOTIFICATION";

//Segment Constants
export const SIGN_IN_EVENT = "Sign In Page ‘Sign In’ Button"
export const SIGN_UP_EVENT = "Sign Up Page ‘Sign up’ Button"
export const SIGN_IN_PAGE_EVENT = "Sign Up Page ‘Sign up’ Button"
export const SIGN_UP_APPLE_EVENT = "Sign Up Page ‘Apple’ Button"
export const SIGN_UP_FB_EVENT = "Sign Up Page ‘Facebook’ Button"
export const SIGN_UP_GOOGLE_EVENT = "Sign Up Page ‘Google’ Button"
export const SIGN_IN_APPLE_EVENT = "Sign In Page ‘Apple’ Button"
export const SIGN_IN_FB_EVENT = "Sign In Page ‘Facebook’ Button"
export const SIGN_IN_GOOGLE_EVENT = "Sign In Page ‘Google’ Button"
export const MAP_SEARCH_EVENT = "Map Page ‘Search’ Button"
export const HOME_PAGE_SEARCH_EVENT = "Home Page ‘Search’ Button"

// Common Constants
export const EDIT_SEARCH = "Edit Search";
export const NO_AVAILIBILTY_FOUND = "No Availability Found";
export const SOMETHING_WENT_WRONG = `Something went wrong.`;
export const ALERT = `Alert`;
export const LOGOUT_MSG = "Are you sure you want to log out?";
export const NO_NETWORK = "No Internet Connection";
export const NO_NETWORK_MSG =
  "Please check your internet connection and try again.";
  export const NO_INTERNET_MSG =
    "Please check your internet connection and try again.";
export const NETWORK_ERROR = "TypeError: Network request failed";
export const SESSION_EXPIRED_MSG = `Session Expired. You need to login again`;
export const UPGRADE_MEMBERSHIP_TEXT = `Upgrade Membership`;
export const LIMIT_EXCEEDED = "Limit Exceeded";
export const YES = "Yes";
export const NO = "No";
export const UPGRADE = "Upgrade";
export const UPGRADE_PLAN_TEXT = "Upgrade Plan";
export const OK = "Ok";
export const CANCEL = "cancel";
export const CANCEL_TEXT = "Cancel";
export const LOGIN = "SignIn";
export const LOGIN_SIGNUP = "Sign In / Sign Up"
export const LOGIN_TEXT = "Please Sign In / Sign Up to use this feature";
export const ONE_WAY = "One Way";
export const RETURN = "Return";
export const RETURN_DATE = "Return Date(s)";
export const RETURN_DATE1 = "Return Date";
export const AIRLINE = "Airline";
export const MEMBERSHIP_TIER = "Membership Tier";
export const SEARCH_MAP = "Search";
export const DEPARTURE_CITY = "Departure City";
export const AIRPORT_TEXT = "Airport";
export const CABIN_CLASS = "Cabin Class";
export const TRAVELLERS = "Travellers";
export const PASSENGERS = "Passengers";
export const PASSENGER = "Passenger";
export const DEPART_TEXT = "Departure";
export const DEPART_DATE = "Departure Date(s)";
export const CHOOSE_ALL_FIELDS = "Please choose all fields";
export const FLIGHT_TYPE = "Flight Type";
export const PASSENGER_COUNT = "Passenger Number";
export const DELETE_TEXT = "Delete";
export const DELETE_EMAIL = "Delete Email";
export const DELETE_NUMBER = "Delete Number";
export const SELECT_CABIN = "Please select any one cabin class";
export const ALERT_UPDATED = "Alert updated";
export const VIEW_AVAILABILITY = "View Availability";
export const VIEW_CALENDAR_PAGE = "View Calendar Page";
export const VIEW_CALENDAR = "View Calendar";
export const EDIT_TEXT = "Edit";
export const EDIT_ALERT_TEXT = "Edit Alert";
export const MEMBER_TEXT = "Member";
export const SEATS_TEXT = "Seats";
export const POINTS_TEXT = "Points";
export const ECONOMY = "Economy";
export const PREMIUM_ECONOMY = "Premium Economy";
export const BUSINESS = "Business";
export const FIRST = "First";
export const SELECT_TEXT = "Select";
export const CHOOSE_DATE = "Please choose a Date";
export const DESTINATION_CITY = "Destination City";
export const ORIGIN_CITY = "Origin City";
export const TO = "TO";
export const FROM = "FROM";
export const ON = "On";
export const OFF = "Off";
export const IGNORE = "Ignore";
export const SORT_BY = "Sort By";
export const NO_FLIGHT_AVAILABLE = "No Flight Available"
export const NO_FLIGHT_SCHEDULE = "No Flight Schedule"
export const GOLD_DATE_RANGE = "You are allowed a maximum date range of 60 days."
export const SILVER_DATE_RANGE = "You are allowed a maximum date range of 45 days."
export const BRONZE_DATE_RANGE = "You are allowed a maximum date range of 20 days."
export const DATE_RANGE_ALERT = "Please select the date range."
export const NO_SEAT_AVAILABLE_IN_CLASS  = "No seat available in any cabin class"
export const BRITISH_AIRWAYS = "British Airways";
export const AMERICAN_AIRLINES = "American Airlines";
export const AIRLINE_MEMBERSHIP_TIERS = "Airline Membership Tier";
export const CONFIRM_AIRLINE_TIERS = "Confirm Your Airline Membership Tier"
export const AIRLINE_MESSAGE = "We’ve moved this setting away from the search bar.If you need to update it in the future you can do so in your User Dashboard."
export const BRONZE_ALERT_INFO = "Bronze Member can create alert with Economy Class only."
export const DD_MM_YYYY_FORMAT = 'DD-MM-YYYY';
export const YYYY_MM_DD_FORMAT = 'YYYY-MM-DD';
export const DD_MM_YYYY1 = 'DD/MM/YYYY'
export const PREMIUM = "Premium"
export const AIRCRAFT = "Aircraft"
export const DURATION = "Duration"
export const CHOOSE_IF_UNSURE = "Choose if Unsure"
//  If you want to create alert for all cabin class Upgrade now.";
export const PRICING_OBJECT = [
  {
    title: "Alert Frequency",
    icon: IMAGE_CONST.ALERT_BELL,
    text: `Gold members benefit from instant notifications as soon as we discover new reward seat availability for their alerts. This gives you the best chance of getting reward seats for the most popular flights.\n\nSilver members receive notifications within one hour after we discover new availability.\n\nBronze members receive notifications within 24 hours of us discovering new availability.`,
  },
  {
    title: '"Where Can I Go” Map Search ',
    icon: IMAGE_CONST.MAP_LOCATION,
    text:
      "See all the available routes on your preferred date(s) on a global map view. This feature is extremely useful if you know the dates you want to travel, but haven’t yet decided on a destination. This feature is only available to Silver and Gold members. ",
  },
  {
    title: "Availability Alert Method",
    icon: IMAGE_CONST.ALERT_METHOD,
    emailText: "Available to all membership tiers.",
    notificationText:
      "Available to Silver & Gold tiers via our iOS and Android app.",
    smsText:
      "Available to Gold tier only. SMS is useful when you have limited access to the internet whilst travelling. As long as you have a mobile signal, our SMS alerts will reach you! SMS is subject to a fair use clause of 25 messages/month.",
  },
  {
    title: "iOS & Android App",
    icon: IMAGE_CONST.PHONE_ICON,
    text:
      "Easily see all of your alerts, and receive push notifications whenever we find new reward seat availability.",
  },
  {
    title: "More Airlines, More Features,More Member Benefits",
    icon: IMAGE_CONST.SMILE,
    text:
      "We started in 2014, and we’re not going to stop improving any time soon. We have additional airlines planned on our roadmap, as well as other exciting features.",
  },
];

export const COUNTRY_ARRAY = [
  "Austria",
  "Belgium",
  "Denmark",
  "Finland",
  "France",
  "Germany",
  "Ireland",
  "Italy",
  "Luxembourg",
  "Netherlands",
  "Norway",
  "Portugal",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
  "United States of America",
];

export const countryOptions = [
  {
    text: "Austria",
    key: "AT",
    value: "AT",
    currency: "EUR",
  },
  {
    text: "Belgium",
    key: "BE",
    value: "BE",
    currency: "EUR",
  },
  {
    text: "Denmark",
    key: "DK",
    value: "DK",
    currency: "DKK",
  },
  {
    text: "Finland",
    key: "FI",
    value: "FI",
    currency: "EUR",
  },
  {
    text: "France",
    key: "FR",
    value: "FR",
    currency: "EUR",
  },
  {
    text: "Germany",
    key: "DE",
    value: "DE",
    currency: "EUR",
  },
  {
    text: "Ireland",
    key: "IE",
    value: "IE",
    currency: "EUR",
  },
  {
    text: "Italy",
    key: "IT",
    value: "IT",
    currency: "EUR",
  },
  {
    text: "Luxembourg",
    key: "LU",
    value: "LU",
    currency: "EUR",
  },
  {
    text: "Netherlands",
    key: "NL",
    value: "NL",
    currency: "EUR",
  },
  {
    text: "Norway",
    key: "NO",
    value: "NO",
    currency: "NOK",
  },
  {
    text: "Portugal",
    key: "PT",
    value: "PT",
    currency: "EUR",
  },
  {
    text: "Spain",
    key: "ES",
    value: "ES",
    currency: "EUR",
  },
  {
    text: "Sweden",
    key: "SE",
    value: "SE",
    currency: "SEK",
  },
  {
    text: "Switzerland",
    key: "CH",
    value: "CH",
    currency: "CHF",
  },
  {
    text: "United Kingdom",
    key: "GB",
    value: "GB",
    currency: "GBP",
  },
  {
    text: "United States of America",
    key: "US",
    value: "US",
    currency: "USD",
  },
];

export const countryPhoneOptions = [
  "Algeria",
  "Andorra",
  "Argentina",
  "Australia",
  "Austria",
  "Bahrain",
  "Bangladesh",
  "Belgium",
  "Bosnia and Herzegovina",
  "Brazil",
  "Canada",
  "Caribbean Netherlands",
  "Chile",
  "China",
  "Colombia",
  "Croatia",
  "Czech Republic",
  "Denmark",
  "Ecuador",
  "Egypt",
  "Estonia",
  "Finland",
  "France",
  "French Polynesia",
  "Germany",
  "Greece",
  "Hong Kong",
  "Hungary",
  "India",
  "Indonesia",
  "Iran",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Latvia",
  "Lebanon",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malaysia",
  "Malta",
  "Mauritius",
  "Mexico",
  "Morocco",
  "Nepal",
  "New Zealand",
  "Nicaragua",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Thailand",
  "Tunisia",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Venezuela",
  "Vietnam",
];

export const profileScreenOptions = [
  {
    text: "Personal \n Info ",
    icon: IMAGE_CONST.USER_PROFILE_ICON,
    navigationScreen: USER_PROFILE_DETAIL_SCREEN,
  },
  {
    text: "Notification Settings",
    icon: IMAGE_CONST.NOTIFICATION_SETTINGS_ICON,
    navigationScreen: NOTIFICATION_SETTINGS_SCREEN,
  },
  {
    text: "Change \n Password",
    icon: IMAGE_CONST.CHANGE_PASSWORD_ICON,
    navigationScreen: CHANGE_PASSWORD_SCREEN,
  },
  {
    text: "Update \n Email/Phone",
    icon: IMAGE_CONST.MANAGE_CONTACT_DETAILS_ICON,
    navigationScreen: MANAGE_CONTACT_SCREEN,
  },

  {
    text: "Airline Membership Tier",
    icon: IMAGE_CONST.AIRLINE_TIER_ICON,
    navigationScreen: AIRLINE_MEMBERSHIP_SCREEN,
  },
  {
    text: "Delete Your \nAccount",
    icon: IMAGE_CONST.DELETE_ACCOUNT_ICON,
    // navigationScreen: AIRLINE_MEMBERSHIP_SCREEN,
  },
];

export const profileScreenOptions1 = [
  {
    text: "Personal \n Info ",
    icon: IMAGE_CONST.USER_PROFILE_ICON,
    navigationScreen: USER_PROFILE_DETAIL_SCREEN,
  },

  {
    text: "Notification Settings",
    icon: IMAGE_CONST.NOTIFICATION_SETTINGS_ICON,
    navigationScreen: NOTIFICATION_SETTINGS_SCREEN,
  },

  {
    text: "Manage Contact Details",
    icon: IMAGE_CONST.MANAGE_CONTACT_DETAILS_ICON,
    navigationScreen: MANAGE_CONTACT_SCREEN,
  },
  
  {
    text: "Airline Membership Tier",
    icon: IMAGE_CONST.AIRLINE_TIER_ICON,
    navigationScreen: AIRLINE_MEMBERSHIP_SCREEN,
  },
];

export const profileScreenOptions3 = [
  {
    text: "Personal \n Info ",
    icon: IMAGE_CONST.USER_PROFILE_ICON,
    navigationScreen: USER_PROFILE_DETAIL_SCREEN,
  },
  {
    text: "Notification Settings",
    icon: IMAGE_CONST.NOTIFICATION_SETTINGS_ICON,
    navigationScreen: NOTIFICATION_SETTINGS_SCREEN,
  },
  {
    text: "Change \n Password",
    icon: IMAGE_CONST.CHANGE_PASSWORD_ICON,
    navigationScreen: CHANGE_PASSWORD_SCREEN,
  },
  {
    text: "Update \n Email/Phone",
    icon: IMAGE_CONST.MANAGE_CONTACT_DETAILS_ICON,
    navigationScreen: MANAGE_CONTACT_SCREEN,
  },
  {
    text: "Delete Your \nAccount",
    icon: IMAGE_CONST.DELETE_ACCOUNT_ICON,
    // navigationScreen: AIRLINE_MEMBERSHIP_SCREEN,
  },
];




export const ageBandOption = [
  {
    value: '17-20',
    label: '17-20'
  },
  {
    value: '21-29',
    label: '21-29'
  },
  {
    value: '30-39',
    label: '30-39'
  },
  {
    value: '40-49',
    label: '40-49'
  },
  {
    value: '50-59',
    label: '50-59'
  },
  {
    value: '60-69',
    label: '60-69'
  },
  {
    value: '70+',
    label: '70+'
  }
]

export const approxNumberFlights = [
  {
    value: '1-3',
    label: '1-3'
  },
  {
    value: '3-6',
    label: '3-6'
  },
  {
    value: '6+',
    label: '6+'
  },
]

export const genderOptions = [
  {
    value: 'Male',
    label: 'Male'
  },
  {
    value: 'Female',
    label: 'Female'
  },
  // {
  //   value: 'Other',
  //   label: 'Other'
  // },
  {
    value: 'Other',
    label: 'I\'d prefer not to say'
  }
]

export const travelAbroadOptions = [
  {
    value: 'Unlikely',
    label: 'Unlikely'
  },
  {
    value: 'Likely',
    label: 'Likely'
  },
  {
    value: 'Very Likely',
    label: 'Very Likely'
  }
]
