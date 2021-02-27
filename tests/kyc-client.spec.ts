

import KYC from '../lib/kyc-client';
import * as errors from '../lib/errors/errors';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;


afterEach(() => {
    jest.clearAllMocks();
});


describe("KYC Client test", () => {
    it("Should return true validation with a valid Payload", async () => {
        const payload = {
            birthDate : "1985-02-08",
            givenName : "James",
            middleName : "Robert",
            familyName : "Smith",
            licenceNumber : "94977000",
            stateOfIssue : "NSW",
            expiryDate : "2020-01-01"
        }

        mockedAxios.post.mockResolvedValue({
            "data":{
                "verifyDocumentResult": {
                    "type": "DriverLicenceResponse"
                    },
                    "verificationRequestNumber": 12345,
                    "verificationResultCode": "Y"
                }
            })

        const client = new KYC('testKey')

        const res = await client.validate(payload)

        expect(res.kycResult).toBe(true)
    })

    it("Should return false validation with a valid Payload", async () => {
        const payload = {
            birthDate : "1985-02-08",
            givenName : "James",
            middleName : "Robert",
            familyName : "Smith",
            licenceNumber : "94977000",
            stateOfIssue : "NSW",
            expiryDate : "2020-01-01"
        }

        mockedAxios.post.mockResolvedValue({
            "data":{
                "verifyDocumentResult": {
                    "type": "DriverLicenceResponse"
                    },
                    "verificationRequestNumber": 12345,
                    "verificationResultCode": "N"
                }
            })

        const client = new KYC('testKey')

        const res = await client.validate(payload)

        expect(res.kycResult).toBe(false)
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

    it("Should fail with error indicating a failed response", async () => {
        const payload = {
            birthDate : "1985-02-08",
            givenName : "James",
            middleName : "Robert",
            familyName : "Smith",
            licenceNumber : "94977000",
            stateOfIssue : "NSW",
            expiryDate : "2020-01-01"
        }

        mockedAxios.post.mockResolvedValue({
            "data":{
                "verifyDocumentResult": {
                    "type": "DriverLicenceResponse"
                    },
                    "verificationRequestNumber": 12345,
                    "verificationResultCode": "S"
                }
            })

        const client = new KYC('testKey')

        await expect(client.validate(payload)).rejects.toThrow()
    })

    it("Should fail with error indicating a failed response", async () => {
        const payload = {
            birthDate : "1985-02-08",
            givenName : "James",
            middleName : "Robert",
            familyName : "Smith",
            licenceNumber : "94977000",
            stateOfIssue : "NSW",
            expiryDate : "2020-01-01"
        }

        mockedAxios.post.mockResolvedValue({
            "data":{
                "verifyDocumentResult": {
                    "type": "DriverLicenceResponse"
                    },
                    "verificationRequestNumber": 12345,
                    "verificationResultCode": "D"
                }
            })

        const client = new KYC('testKey')

        await expect(client.validate(payload)).rejects.toThrow()
    })
})