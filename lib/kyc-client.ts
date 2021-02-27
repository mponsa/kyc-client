import axios from 'axios'
import joi, { StringSchema } from 'joi'
import * as errors from './errors/errors' 
import { States } from './enums/enums'


export class KYC{
    _apiKey: string;
    _endpoint: string;

    constructor(apiKey: string, endpoint: string){
        this._apiKey = apiKey;
        this._endpoint = endpoint;
    }

    _validatePayload = (payload: Record<string,unknown>): void => { 
        const schema = joi.object({
            birthDate: joi.date().iso().required(),
            givenName: joi.string().max(100).required(),
            middleName: joi.string().max(100),
            familyName: joi.string().max(100).required(),
            licenceNumber: joi.string().pattern(new RegExp('^[0-9]*$'), 'only numbers').required(),
            stateOfIssue: joi.string().valid(...Object.keys(States)).required(),
            expiryDate: joi.date().iso()
        })

        const { error } = schema.validate(payload)

        if(error){
            throw new errors.INVALID_PARAMETERS_ERROR(error.details.map((d: { message: string; }) => d.message).join(','))
        }
    }

    _getValidation = async (payload: Record<string,unknown>): Promise<KYCResponse> => {
        const headers = {
            Authorization: `Bearer ${this._apiKey}`
        }

        const response = await axios.post(this._endpoint,payload,{headers})

        return response.data
    }

    _mapResult = (response: KYCResponse): KYCResult => {
       const resultMap = new Map([['Y',true],['N',false]])
       const errorMap = new Map([['D','Document Error'],['S','Server Error']])
       
       if(errorMap.has(response.verificationResultCode)){
            const msg = errorMap.get(response.verificationResultCode)
            throw new errors.VERIFY_DOCUMENT_ERROR(msg || '')
        }

       return { kycResult: resultMap.get(response.verificationResultCode) || false }
    }

    validate = async(payload: Record<string,unknown>): Promise<KYCResult> => {
        /* Receives user data and returns if user's driver licence is valid or not */
        this._validatePayload(payload)

        const response = await this._getValidation(payload)

        return this._mapResult(response)
    }
}
