const init_state = {
    id: 0,
    full_name: "",
    username: "",
    email: "",
    errMsg: "",
    storageIsChecked: false,
    is_active: null,
    role: '',
    createdAt: '',
    updatedAt: ''
}

const reducer = (state = init_state, action) => {
    switch (action.type) {
        case "ADMIN_LOGIN":
            console.log(action.payload)
            return { ...state, ...action.payload, storageIsChecked: true }
        case "ADMIN_KEEP_LOGIN":
            return { ...state, ...action.payload, storageIsChecked: true }
        case "ADMIN_ERROR":
            return { ...state, errMsg: action.payload };
        case "ADMIN_LOGOUT":
            return { ...init_state, storageIsChecked: true }
        case "CHECK_STORAGE":
            return { ...state, storageIsChecked: true };
        default:
            return state;
    }
}

export default reducer