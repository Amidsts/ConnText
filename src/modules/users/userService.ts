import {
    createUserRepository,
    findUserRepository
} from "./usersRepository"
import {
    createUserValidator
} from "./uservalidation"

export async function createUserService(payload: {[key: string]: any}) {
    try {
        const {
            username, email,
            password, phoneNo,
            address: {
                country,
                state,
                localGovt,
                postalcode
            }
        } = createUserValidator(payload)

        await createUserRepository(
            {
                username, email,
                password, phoneNo,
                address: {
                    country,
                    state,
                    localGovt,
                    postalcode
                }
            }
        )
        return "user sign up successfully"
        
    } catch (err) {
        return err
    }

}