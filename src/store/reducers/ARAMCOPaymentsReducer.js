import {
    STORE_BENEFICIARY,
    RESET_ARAMCO_STATE,
    STORE_ACCOUNT,
    STORE_BENEFICIARY_DETAILS,
} from '../constants/ARAMCOPayments';

const initialState = {
    selectedAccount: {},
    selectedBeneficiary: {},
    beneficiaryDetails: {},
};

const ARAMCOPaymentsReducer = (state = initialState, action) => {
    if (action.type === STORE_BENEFICIARY) {
        return {
            ...state,
            selectedBeneficiary: action.payload.selectedBeneficiary,
        };
    } else if (action.type === RESET_ARAMCO_STATE) {
        return {
            selectedBeneficiary: {},
            selectedAccount: {},
        };
    } else if (action.type === STORE_ACCOUNT) {
        return {
            ...state,
            selectedAccount: action.payload.selectedAccount,
        };
    } else if (action.type === STORE_BENEFICIARY_DETAILS) {
        return {
            ...state,
            beneficiaryDetails: action.payload.beneficiaryDetails,
        };
    }
    return state;
};

export default ARAMCOPaymentsReducer;
