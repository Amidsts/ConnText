import Post from "./post.model";

export async function createPost(userid: string, payload: {[key: string]: any}, image?: {imgUrl: string, imgId: string}) {

    return new Post({
        userId: userid,
        description: payload,
        postImages: [image]
    }).save() ;

}

export async function getPost (postId: string) {
    return await Post.findById(postId)
}

export async function getPosts () {
    return await Post.find()
}

// export async function deletePost (postid: string, userid: string) {
//     return await Post.findOne({ _id: postid, userId: userid })
// }

export async function updatePost (postid: string) {

    return await Post.findOne({_id: postid})
}