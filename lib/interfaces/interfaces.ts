interface KYCResponse {
    /** Represents api-client response */
    verifyDocumentResult: {
        type: string
    },
    verificationRequestNumber: number
    verificationResultCode: string
}


interface KYCResult {
    /** Represents function result */
    kycResult: boolean
}