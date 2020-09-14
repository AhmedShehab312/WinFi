import {
    STORE_PROFILE,
} from '../constants/Profile';

const initialState = {
    OwnerProfile: {},
};

const ProfileReducer = (state = initialState, action) => {
    if (action.type === STORE_PROFILE) {
        return {
            ...state,
            OwnerProfile: action.payload.OwnerProfile,
        };
    }
    return state;
};

export default ProfileReducer;
