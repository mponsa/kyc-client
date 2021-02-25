interface Payload {
    /** Represents body payload */
    birthDate: string, 
    givenName: string, 
    middleName?: string, 
    familyName: string, 
    licenceNumber: string, 
    stateOffisue: string, 
    expiryDate?:string
}

interface KYCResponse {
    /** Represents function response */
    kycResult: boolean
}

enum States {
    NSW, QLD, SA, TAS, VIC, WA, ACT, NT
}
