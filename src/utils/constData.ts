import { DASHBOARD, EMP_ASSIGN, EMP_MANAGE, EMP_ROLES, FEEDBACK, LOSSTYPE, LOSS_DETAILS } from "./routePaths";


export const LOGGED_IN = "LOGGED_IN";
export const LOGGED_OUT = "LOGGED_OUT";
export const OTP_VERIFY = "OTP_VERIFY";

export const ROLE_ACCESS = "ROLE_ACCESS";

export const SAVE_USER_PATH = "SAVE_USER_PATH";

export const SET_TIMEOUT_ID = "SET_TIMEOUT_ID";
export const CLEAR_TIMEOUT_ID = "CLEAR_TIMEOUT_ID";

export const dashBoardSats = [
    {
        name: "Total",
        count: 1000
    },
    {
        name: "With Tahsildar",
        count: 77
    },
    {
        name: "With Tahsildar Grad 2",
        count: 11
    },
    {
        name: "With ADVS",
        count: 55
    },
    {
        name: "With ADA",
        count: 44
    },
    {
        name: "With ADH",
        count: 30
    },
    {
        name: "With AEE-ZP",
        count: 10
    },
    {
        name: "With AE-EEE (Urban)",
        count: 12
    },
    {
        name: "With VA",
        count: 33
    },
    {
        name: "Rejected",
        count: 22
    },
    {
        name: "Seek Clarification",
        count: 12
    },
    {
        name: "Approved",
        count: 23
    },
];

export const routes = [
    // {
    //     name: "Dashboard",
    //     path: DASHBOARD,
    //     child: [
    //         {
    //             name: "Statistics",
    //             path: DASHBOARD_SATS,
    //             child: []
    //         },
    //         {
    //             name: "Menu",
    //             path: DASHBOARD_SATS,
    //             child: []
    //         },
    //     ]
    // },
    {
        name: "Dashboard",
        path: DASHBOARD,
        child: [],
        icon: "bi bi-speedometer"
    },
    {
        name: "Loss Data",
        path: LOSSTYPE,
        child: [],
        icon: "bi bi-justify"
    },
    {
        name: "Employee",
        path: (EMP_ASSIGN || EMP_MANAGE),
        icon: "bi bi-people",
        child: [
            {
                name: "Roles",
                path: EMP_ROLES
            },
            {
                name: "Assignemnt",
                path: EMP_ASSIGN
            },
            {
                name: "Management",
                path: EMP_MANAGE
            }
        ]
    },
    {
        name: "Feedback",
        path: FEEDBACK,
        child: [],
        icon: "bi bi-chat-dots"
    },
    {
        name: "Loss Details",
        path: LOSS_DETAILS,
        child: [],
        icon: "bi bi-chat-dots"
    },
];

// export const tableData = [
//     for(let i = 0; i < 100, i ++){
//         let obj = {
//      SubmissionId : `SubmissionId ${i}`
//      ApplicantName : `ApplicantName ${i}`
//      LossType : `LossType ${i}`
//      Mobile : `Mobile ${i}`
//      CreatedDate : `CreatedDate ${i}`
//      Hobli : `Hobli ${i}`
//      VillageName : `VillageName ${i}`
//      Status : `Status ${i}`
//          }
//     }
// ]

export const allRoles = [
    {
        value: 1,
        role: "Citizen"
    },
    {
        value: 2,
        role: "Village Accountant"
    },
    {
        value: 3,
        role: "AEE"
    },
    {
        value: 4,
        role: "ADH_VP"
    },
];