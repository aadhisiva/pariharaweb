import {
    ASSIGN_DISTRICT, ASSIGN_GP, ASSIGN_TALUK, DASHBOARD, DIS_MASTER,
    EMP_ASSIGN, EMP_MANAGE, EMP_ROLES, FEEDBACK, GP_MASTER, LOSSTYPE, LOSS_DETAILS,
    ROLE_ACCESS_PATH, ASSIGN_VILLAGE,
    TAL_MASTER, VILLAGE_MASTER,
    ROLE_MAP_TO_CHILD,
    ROLE_MAP_TO_LOSS
} from "./routePaths";


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

export const routesOfSuperAdmin = [
    {
        name: "Dashboard",
        path: DASHBOARD,
        child: [],
        icon: "bi bi-speedometer"
    },
    {
        name: "Roles",
        path: EMP_ROLES,
        child: [],
        icon: "bi bi-speedometer"
    },
    {
        name: "Role Access",
        path: ROLE_ACCESS_PATH,
        child: [],
        icon: "bi bi-speedometer"
    },
    {
        name: "Role Mapping To Child",
        path: ROLE_MAP_TO_CHILD,
        child: [],
        icon: "bi bi-speedometer"
    },
    {
        name: "Role Mapping To Loss",
        path: ROLE_MAP_TO_LOSS,
        child: [],
        icon: "bi bi-speedometer"
    },
    {
        name: "Assign District",
        path: ASSIGN_DISTRICT,
        child: [],
        icon: "bi bi-speedometer"
    },
    {
        name: "Loss Data",
        path: LOSSTYPE,
        child: [],
        icon: "bi bi-justify"
    },
    // {
    //     name: "Feedback",
    //     path: FEEDBACK,
    //     child: [],
    //     icon: "bi bi-chat-dots"
    // },
    {
        name: "Loss Details",
        path: LOSS_DETAILS,
        child: [],
        icon: "bi bi-chat-dots"
    },
    {
        name: "Masters",
        path: (DIS_MASTER || TAL_MASTER || GP_MASTER || VILLAGE_MASTER),
        icon: "bi bi-people",
        child: [
            {
                name: "Districts",
                path: DIS_MASTER
            },
            {
                name: "Taluk",
                path: TAL_MASTER
            },
            {
                name: "Grama Panchayat",
                path: GP_MASTER
            },
            {
                name: "Village",
                path: VILLAGE_MASTER
            }
        ]
    },
];

export const routesOfDistrict = [
    {
        name: "Dashboard",
        path: DASHBOARD,
        child: [],
        icon: "bi bi-speedometer"
    },

    {
        name: "Assign Taluk",
        path: ASSIGN_TALUK,
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
        name: "Loss Details",
        path: LOSS_DETAILS,
        child: [],
        icon: "bi bi-chat-dots"
    }
];

export const routesOfTaluk = [
    {
        name: "Dashboard",
        path: DASHBOARD,
        child: [],
        icon: "bi bi-speedometer"
    },
    {
        name: "Assign Gp",
        path: ASSIGN_GP,
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
        name: "Loss Details",
        path: LOSS_DETAILS,
        child: [],
        icon: "bi bi-chat-dots"
    }
];

export const routesOfGp = [
    {
        name: "Dashboard",
        path: DASHBOARD,
        child: [],
        icon: "bi bi-speedometer"
    },
    {
        name: "Assign Village",
        path: ASSIGN_VILLAGE,
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
        name: "Loss Details",
        path: LOSS_DETAILS,
        child: [],
        icon: "bi bi-chat-dots"
    }
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