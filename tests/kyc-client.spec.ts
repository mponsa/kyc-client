import KYC from '../lib/kyc-client';
import * as errors from '../lib/errors/errors';


describe("KYC Client test", () => {
    it("Should pass validation with a valid Payload", async () => {
        const payload = {
            birthDate : "1985-02-08",
            givenName : "James",
            middleName : "Robert",
            familyName : "Smith",
            licenceNumber : "94977000",
            stateOfIssue : "NSW",
            expiryDate : "2020-01-01"
        }

        const client = new KYC('testKey')

        const res = await client.validate(payload)

        expect(res.kycResult).toBe(true)
    })

    it("Should fail with error indicating an invalid Payload", async () => {
        const payload = {
            birthDate : "1985-02-08",
            givenName : "James",
            middleName : "Robert"
        }

        const client = new KYC('testKey')

        await expect(client.validate(payload)).rejects.toThrow()
    })
})