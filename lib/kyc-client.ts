import axios from 'axios'
import joi from 'joi'
import * as errors from './errors/errors' 

const ENDPOINT: string = '';

class KYC{
    _apiKey: string;

    constructor(apiKey: string){
        this._apiKey = apiKey;
    }

    _validatePayload = (payload: Payload): void => { 
        const schema = joi.object({
            birthDate: joi.date().iso().required(),
            givenName: joi.string().max(100).required(),
            middleName: joi.string().max(100),
            familiyName: joi.string().max(100).required(),
            licenceNumber: joi.string().pattern(new RegExp('^[0-9]*$'), 'only numbers').required(),
            stateOfIssue: joi.string().valid(Object.keys(States)).required(),
            expiryDate: joi.date().iso()
        })

        const { error, value } = schema.validate(payload)

        if(error){
            throw new errors.INVALID_PARAMETERS_ERROR(error.details.map((d: { message: string; }) => d.message).join(','))
        }
    }

    validate = async(payload: Payload): Promise<KYCResponse> => {
        /* Receives user data and returns if user is valid or not */
        const response: KYCResponse = {
            kycResult: false
        };
        this._validatePayload(payload)

        return response
    }
}