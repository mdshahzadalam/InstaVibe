import sharp from "sharp";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import cloudinary from "../utils/cloudinary.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
// import { v2 as cloudinary } from 'cloudinary';

// export const addNewPost = async (req, res) =>{
//     try {
//         const {caption} = req.body;
//         const image = req.file;
//         const autherId = req.id;

//         if(!image){
//             return res.status(400).json({
//                 message: "Image is required!",
//                 success: false,
//             });
//         }

//         //image upload request

//         const optimizedImageBuffer = await sharp(image.buffer).resize({width:800, height:800, fit:'inside'}).toFormat('jpeg', {quality:80}).toBuffer();

//         const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;

//         const cloudResponse = await cloudinary.uploader(fileUri);

//         const post = await Post.create({
//             caption,
//             image: cloudResponse.secure_url,
//             userId: autherId,
//         })

//         const user = await User.findById(autherId);

//         if(user){
//             user.posts.push(post._id);
//             await user.save();
//         }

//         await post.populate({
//             path:'author',
//             select: '-password'
//         })

//         return res.status(201).json({
//             message: "Post created successfully!",
//             post,
//             success: true,
//         })

//     } catch (error) {
//         console.log(error);
//     }
// }

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
//   });

export const addNewPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        const autherId = req.id;

        console.log("Received Caption:", req.body.caption);
        console.log("Received File:", req.file);
        console.log("Received ID:", req.id);


        console.log("🧾 Caption:", caption);
        console.log("📷 Image Info:", image);
        console.log("🧑‍💻 Author ID:", autherId);

        if (!image) {
            return res.status(400).json({
                message: "Image is required!",
                success: false,
            });
        }

        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        console.log("✅ Image optimized.");

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;

        const cloudResponse = await cloudinary.uploader.upload(fileUri, {
            folder: 'posts',
            resource_type: 'image',
        });

        console.log("✅ Cloudinary response:", cloudResponse);



        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: autherId, // ✅ Correct
        });

        console.log("✅ Post created:", post);

        const user = await User.findById(autherId);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({
            path: 'author',
            select: '-password',
        });

        return res.status(201).json({
            message: "Post created successfully!",
            post,
            success: true,
        });

    } catch (error) {
        console.error("🚨 Error in addNewPost:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });

    }
};



export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate({ path: 'author', select: 'username  profilePicture' })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: {
                    path: 'author',
                    select: 'username profilePicture'
                }
            });
        return res.status(200).json({
            posts,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}


export const getUserPost = async (req, res) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 }).populate({
            path: 'author',
            select: 'username, profilePicture'
        }).populate({
            path: 'comments',
            sort: { createdAt: -1 },
            populate: {
                path: 'author',
                select: 'username, profilePicture'
            }
        })
        return res.status(200).json({
            posts,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}


export const likePost = async (req, res) => {
    try {
        const likekrnewalaId = req.id;
        const postId = req.params.id;
        const post = await Post.findByIdAndUpdate(postId);
        if (!post) return res.status(404).json({
            message: "Post not found!",
            success: false,
        })

        //like logic
        await post.updateOne({ $addToSet: { likes: likekrnewalaId } });

        await post.save();

        //implementing socket io for real time notification


        const user = await User.findById(likekrnewalaId).select('username profilePicture');
         
        const postOwnerId = post.author.toString();
        if(postOwnerId !== likekrnewalaId){
            // emit a notification event
            const notification = {
                type:'like',
                userId:likekrnewalaId,
                userDetails:user,
                postId,
                message:'Your post was liked'
            }
            const postOwnerSocketId = getReceiverSocketId(postOwnerId);
            io.to(postOwnerSocketId).emit('notification', notification);
        }


        return res.status(200).json({
            message: "Post liked successfully!",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}




export const dislikePost = async (req, res) => {
    try {
        const likekrnewalaId = req.id;
        const postId = req.params.id;
        const post = await Post.findByIdAndUpdate(postId);
        if (!post) return res.status(404).json({
            message: "Post not found!",
            success: false,
        })

        //dislike logic
        await post.updateOne({ $pull: { likes: likekrnewalaId } });

        await post.save();

        //implementing socket io for real time notification



        const user = await User.findById(likekrnewalaId).select('username profilePicture');
        const postOwnerId = post.author.toString();
        if(postOwnerId !== likekrnewalaId){
            // emit a notification event
            const notification = {
                type:'dislike',
                userId:likekrnewalaId,
                userDetails:user,
                postId,
                message:'Your post was liked'
            }
            const postOwnerSocketId = getReceiverSocketId(postOwnerId);
            io.to(postOwnerSocketId).emit('notification', notification);
        }


        return res.status(200).json({
            message: "Post disliked successfully!",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}



export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentKrneawalaId = req.id;

        const { text } = req.body;

        const post = await Post.findById(postId);

        if (!text) {
            return res.status(400).json({
                message: "Comment text is required!",
                success: false,
            })
        }

        const comment = await Comment.create({
            text,
            author: commentKrneawalaId,
            post: postId,
        })

        await comment.populate({
            path: 'author',
            select: 'username profilePicture'
        })
        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message: "Comment added successfully!",
            comment,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}


export const getCommentsOfPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({ post: postId }).populate('author, username profilePicture');

        if (!comments) {
            return res.status(404).json({
                message: "No comments found for this post!",
                success: false,
            })
        }
        return res.status(200).json({
            comments,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}


export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found!",
                success: false,
            })
        }

        //check if the log in user is the owner of the post
        if (post.author.toString() !== authorId) {
            return res.status(401).json({
                message: "Unauthorized to delete this post!",
                success: false,
            })
        }

        //delete the post

        await Post.findByIdAndDelete(postId);

        //remove the post from the user's posts array

        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() != postId);
        await user.save();

        //delete associated comments
        await Comment.deleteMany({ post: postId });

        return res.status(200).json({
            message: "Post deleted successfully!",
            success: true,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}


export const bookmarkPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({
            message: "Post not found!",
            success: false,
        })

        const user = await User.findById(authorId);
        if (user.bookmarks.includes(post._id)) {
            //already bookmarked -> remove from the bookmarks
            await user.updateOne({ $pull: { bookmarks: post._id } });
            await user.save();
            return res.status(200).json({
                type: 'unsaved',
                message: "Post unbookmarked successfully!",
                success: true,
            })
        } else {
            //bookmark the post
            await user.updateOne({ $addToSet: { bookmarks: post._id } });
            await user.save();
            return res.status(200).json({
                type: 'saved',
                message: "Post bookmarked successfully!",
                success: true,
            })
        }

    } catch (error) {
        console.log(error);
    }
}