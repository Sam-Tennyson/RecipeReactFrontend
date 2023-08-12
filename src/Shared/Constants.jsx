import { Images } from "./Images";
import { ROUTE_CONSTANTS } from "./Routes";

export const STATUS_CODE = {
    SUCCESS_200: 200,
    SUCCESS_201: 201,
}

export const HEADER_TAB = [
    {
        path: ROUTE_CONSTANTS.DASHBOARD,
        name: "Dashboard",
    },
    {
        path: ROUTE_CONSTANTS.ABOUT_US,
        name: "About us",
    },
]

export const SIDEBAR_CONSTANT = [
    {
        path: ROUTE_CONSTANTS.ARCADE_GAME,
        name: "Arcade Game",
        // image: <ChangeCircleIcon />
    },
    {
        path: ROUTE_CONSTANTS.LEARN_PAYMENT,
        name: "Integrate Payment",
        // image: <ChangeCircleIcon />
    },
    {
        path: ROUTE_CONSTANTS.CHAT,
        name: "Chat app",
        // image: <ChangeCircleIcon />
    },
    {
        path: ROUTE_CONSTANTS.MY_GPAY_PAYMENT,
        name: "Gpay Payment",
        // image: <ChangeCircleIcon />
    },
    {
        path: ROUTE_CONSTANTS.MY_RAZORPAY_PAYMENT,
        name: "Gpay Payment123",
        // image: <ChangeCircleIcon />
    },
]


export const PLACEHOLDER = {
    EMAIL: "Enter your email",
    NAME: "Enter your name",
    PHONE: "Enter your phone",
    PASSWORD: "Enter your password",
    TITLE: "Enter title",
    DESCRPTION: "Enter description"
}

export const STRINGS = {
    UPLOAD_FILE: "Upload File",
    HOME: "Home",
    ABOUT_US: "About us",
    YOUR_PROFILE: "Your profile",
    EDIT_RECIPE: "Edit recipe",
    ADD_RECIPE: "Add a recipe",
    CATEGORY:"Category",
    DIRECTION:"Direction",
    INGREDIENT:"Ingredient",
    IMAGE:"Image",
    DESCRPTION:"Descrption",
    FIRSTNAME: "First name",
    LASTNAME: "Last name",
    EMAIL: "Email",
    NAME: "Name",
    PHONE: "Phone",
    PASSWORD: "Password",
    LOGIN: "Login",
    LOGOUT: "Logout",
    SIGNUP: "Sign Up",
    SHOW_PASSWORD: "Show Password",
    PLEASE_LOGIN: "Please login",
    PLEASE_SIGN_IN: "Please sign in",
    DIDNT_REGISTER: "Didn't register",
    SUPPORT_PEOPLE: "Support People",
    TITLE: "Title",
    ADD: "Add",
    NO_DATA_FOUND: "No Data Found",
    UPLOAD: "Upload",
}

export const LABELS = {
    MENU: "Menu",
    LOGIN: "Login",
    SIGNUP: "Signup",
    ABOUT_US: "About Us",
    DASHBOARD: "Dashboard",
    SUBMIT: "Submit",
    EDIT_CAUSE: "Edit Cause",
    ADD: "Add",
    UPDATE: "Update",
    CONFIRMATION: "Confirmation",
    CANCEL: "Cancel",
    DELETE: "Delete",
    ADD_CAUSE : "Add Cause",
    LOGOUT: "Logout",
    MY_RECIPE:  "My recipes",
    ADD_RECIPE: "Want to add recipe",
}

export const ERROR_MESSAGE = {
    FIELD_REQUIRED: "Field is required",
    SOMETHING_WENT_WRONG: "Sorry, Something went wrong",
    VALID_EMAIL: "Please enter a valid (Eg: abc@xyz.com)",
    WHITE_SPACE: "White space is not allowed",
    NO_DATA_FOUND: "No data is avaliable"
}

export const RESPONSE = {
    RECIPE_ADDEE_SUCCESS: "Your recipe has been added",
    SUCCESS_LOGIN: "Successfully Login",
    SUCCESS_REGISTER: "Successfully Registered",
    SUCCESS_ADDED_CAUSE: "New cause added successfully",
    RECIPE_SUCCESS: "Recipe Added Successfully",
}

export const PROFILE_TIPPY =[
    {
        label: "Dashboard",
        value: "0"
    },
    {
        label: "Profile",
        value: "1"
    },
    {
        label: "Add Cause",
        value: "2"
    },
    {
        label: "My Cause",
        value: "3"
    },
    {
        label: "Logout",
        value: "4"
    },
]

export const STRING_NUMBER = {
    ZERO: "0",
    ONE: "1",
    TWO: "2",
    THREE: "3",
    FOUR: "4",
    FIVE: "5",
    SIX: "6",
    SEVEN: "7",
    EIGHT: "8",
    NINE: "9",
    TEN: "10",
    ELEVEN: "11",
    TWELVE: "12",
    THIRTHEEN: "13",
    FOURTEEN: "14",
    FIFTHTEEN: "15",
}

export const CONFIRM_MESSAGE = {
    CAUSE_DELETE: "Are you sure you want delete this cause ?"
}

export const RIGHT_ACTION = [
    {
        label: LABELS?.DASHBOARD,
        value: "1",
        icon: Images?.dashboardSvg,
        path: ROUTE_CONSTANTS?.DASHBOARD
    },
    {
        label: LABELS?.MY_RECIPE,
        value: "2",
        icon: Images?.listSvg,
        path: ROUTE_CONSTANTS?.MY_RECIPE
    },
    {
        label: LABELS?.ADD_RECIPE,
        value: "3",
        icon: Images?.addSvg,
        path: ROUTE_CONSTANTS?.ADD_RECIPE
    },
    {
        label: LABELS?.ABOUT_US,
        value: "3",
        icon: Images?.addSvg,
        path: ROUTE_CONSTANTS?.ABOUT_US
    },
    {
        label: LABELS?.LOGIN,
        value: "3",
        icon: Images?.addSvg,
        path: ROUTE_CONSTANTS.LOGIN
    },
    
    {
        label: LABELS?.SIGNUP,
        value: "3",
        icon: Images?.addSvg,
        path: ROUTE_CONSTANTS?.SIGNUP
    },
    
    {
        label: LABELS?.LOGOUT,
        value: "4",
        icon: Images?.logoutSvg
    },

]