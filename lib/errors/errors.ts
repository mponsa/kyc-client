class KYC_ERROR extends Error {
    constructor(message: string) {
        super(message);
        Error.captureStackTrace(this, KYC_ERROR);
    }
}

class INVALID_PARAMETERS_ERROR extends KYC_ERROR {
    constructor(message: string) {
        super(message);
    }   
}

class VERIFY_DOCUMENT_ERROR extends KYC_ERROR {
    constructor(message: string) {
        super(message);
    }   
}


export {INVALID_PARAMETERS_ERROR, VERIFY_DOCUMENT_ERROR}