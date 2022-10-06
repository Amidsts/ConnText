import User from "./usermodel";
import Post from "../../models/post.model";

export async function createUser(payload: {[key: string]: any}) {
    return new User( payload ).save()
    
}

export async function findUser(payload: {[key: string]: any}) {
    return await User.findOne(payload)
}

//post
export async function createPost(userid: string, payload: {[key: string]: any}, image?: {imgUrl: string, imgId: string}) {

    return new Post({
        userId: userid,
        description: payload,
        postImages: [image]
    }).save() ;

}