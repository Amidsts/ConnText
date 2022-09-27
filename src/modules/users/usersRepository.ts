import User from "./usermodel";

export async function createUser(payload: {[key: string]: any}) {
    return new User( payload ).save()
    
}

export async function findUser(payload: {[key: string]: any}) {
    return await User.findOne(payload).select("-password")
}

