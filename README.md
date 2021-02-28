## KYC - CLIENT

KYC Client provides a function ready to validate user data. This library is made in typescript and wraps API-Calls to validation server.

### Usage 

#### Install
````
npm i @asnopm/kyc-cient
````````

----

#### Import & Run

````
import client from 'kyc-client'

const kycClient = new client.KYC('<API-KEY>','https://australia-southeast1-reporting-290bc.cloudfunctions.net/driverlicence')

const userData = {
            birthDate : "1985-02-08",
            givenName : "James",
            middleName : "Robert",
            familyName : "Smith",
            licenceNumber : "94977000",
            stateOfIssue : "NSW",
            expiryDate : "2020-01-01"
}

const main = async() => {
  try{  
      const res = await kycClient.validate(userData)
      console.log(`Validation was: ${res.kycResult}`)
  }catch(error){
      console.log(`Validation failed: `${error.message}`)
  }
}

main()
````

##### Valid parameters

| Parameter     | Type   | Constraints                                       |
|:------------- | ------ | ------------------------------------------------- |
| birtDate      | string | Format: YYYY-MM-DD                                |
| givenName     | string | Max 100 characters                                |
| middleName    | string | **Optional**. Max 100 characters                  |
| familyName    | string | Max 100 characters                                |
| licenceNumber | string | Only numbers                                      |
| stateOfIssue  | string | Valid states: NSW, QLD, SA, TAS, VIC, WA, ACT, NT |
| expiryDate    | string | **Optional** Format: YYYY-MM-DD                   |

----

#### Possible Errors

`INVALID_PARAMETERS_ERROR`: Indicates wrong parameters in payload.

`VERIFY_DOCUMENT_ERROR`: Indicates API had either a document error or a server error.

`API_ERROR`: Indicates a failure in http communication with third party API. Check your API_KEY was entered correctly.