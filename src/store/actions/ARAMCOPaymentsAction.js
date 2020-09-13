import {
    STORE_BENEFICIARY,
    RESET_ARAMCO_STATE,
    STORE_ACCOUNT,
    STORE_BENEFICIARY_DETAILS,
} from '../constants/ARAMCOPayments';

function resetState() {
    return {
        type: RESET_ARAMCO_STATE,
        payload: null,
    };
}

function storeBeneficiary(selectedBeneficiary) {
    return {
        type: STORE_BENEFICIARY,
        payload: { selectedBeneficiary },
    };
}

function storeAccount(selectedAccount) {
    return {
        type: STORE_ACCOUNT,
        payload: { selectedAccount },
    };
}

function storeBeneficiaryDetails(beneficiaryDetails) {
    return {
        type: STORE_BENEFICIARY_DETAILS,
        payload: { beneficiaryDetails },
    };
}

export { resetState, storeBeneficiary, storeAccount, storeBeneficiaryDetails };
