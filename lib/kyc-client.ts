const axios = require('axios').default;
const joi = require('joi');
const url: string = '';

class KYC{
    _apiKey: string;

    constructor(apiKey: string){
        this._apiKey = apiKey
    }

    _validatePayload = (payload: Payload): void => { 
        
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