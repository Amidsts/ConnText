import User from "./usermodel";

export async function createUserRepository (payload: {[key: string]: any}) {
    return new User( payload ).save()
}

export async function findUserRepository(payload: {[key: string]: any}) {
    return await User.findOne(payload)
}