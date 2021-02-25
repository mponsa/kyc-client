class KYC_ERROR extends Error {
    constructor(message: string) {
        super(message);
        Error.captureStackTrace(this, KYC_ERROR);
    }
}

class MISSING_PARAMETERS extends KYC_ERROR {
    constructor(message: string) {
        super(message);
    }   
}

class VERIFY_DOCUMENT extends KYC_ERROR {
    constructor(message: string) {
        super(message);
    }   
}


module.exports = {MISSING_PARAMETERS, VERIFY_DOCUMENT}