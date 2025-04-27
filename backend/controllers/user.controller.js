import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Post } from "../models/post.model.js";
// import getDataUri from "../utils/datauri.js";


export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Something is missing, please Check!",
                success: false,
            });
        }


        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Email already exists!",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "User registered successfully!",
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Something is missing, please Check!",
                success: false,
            });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found!",
                success: false,
            });
        }
        const isPasswordMacth = await bcrypt.compare(password, user.password);
        if (!isPasswordMacth) {
            return res.status(400).json({
                message: "Incorrect email or password!",
                success: false,
            });
        }


        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });

        //populate each post if in the posts array

        const populatedPosts = await Promise.all(
            user.posts.map(async (postId) => {
                const post = await Post.findById(postId);
                if (post && post.author && post.author.equals(user._id)) {
                    return post;
                }
                return null;
            })
        )

        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts: populatedPosts,
        }

        return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 }).json({
            message: `${user.username} logged in successfully!`,
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
    }
}


export const logout = async (_, res) => {
    try {
        return res.cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully!",
            success: true,
        });
    } catch (error) {
        console.error(error);
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId).populate({ path: 'posts', createdAt: -1 }).populate('bookmarks');
        return res.status(200).json({
            user,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}


// export const editProfile = async (req, res) =>{
//     try {
//         const userId = req.id;
//         const {bio, gender} = req.body;
//         const profilePicture = req.file;
//         let cloudResponse;

//         if(profilePicture){
//             const fileUri = getDataUri(profilePicture);
//             cloudResponse = await cloudinary.uploader.upload(fileUri);
//         }

//         const user = await User.findById(userId).select('-password');

//         if(!user){
//             return res.status(404).json({
//                 message: "User not found!",
//                 success: false,
//             });
//         }

//         if(bio) user.bio = bio;
//         if(gender) user.gender = gender;
//         if(profilePicture) user.profilePicture = cloudResponse.secure_url;

//         await user.save();

//         return res.status(200).json({
//             message: "Profile updated successfully!",
//             success: true,
//             user,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }



export const editProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { bio, gender } = req.body;
        const profilePicture = req.file;
        let cloudResponse;

        // if (profilePicture) {
        //     const fileUri = getDataUri(profilePicture);
        //     cloudResponse = await cloudinary.uploader.upload(fileUri);
        // }


        if (profilePicture) {
            const fileUri = getDataUri(profilePicture); // 👈 Now this works
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }



        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        };
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePicture) user.profilePicture = cloudResponse.secure_url;

        await user.save();

        return res.status(200).json({
            message: 'Profile updated.',
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
    }
};


// export const editProfile = async (req, res) => {
//     try {
//         const userId = req.id;
//         const { bio, gender } = req.body;
//         const profilePicture = req.file;
//         let cloudResponse;

//         if (profilePicture) {
//             const fileUri = getDataUri(profilePicture);
//             cloudResponse = await cloudinary.uploader.upload(fileUri);
//         }

//         const user = await User.findById(userId).select('-password');
//         if (!user) {
//             return res.status(404).json({
//                 message: 'User not found.',
//                 success: false
//             });
//         };
//         if (bio) user.bio = bio;
//         if (gender) user.gender = gender;
//         if (profilePicture) user.profilePicture = cloudResponse.secure_url;

//         await user.save();

//         return res.status(200).json({
//             message: 'Profile updated.',
//             success: true,
//             user
//         });

//     } catch (error) {
//         console.log(error);
//     }
// };

export const getSuggestedUsers = async (req, res) => {
    try {
        const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select("-password");
        if (!suggestedUsers) {
            return res.status(404).json({
                message: "No suggested users found!",
                success: false,
            });
        }
        return res.status(200).json({
            users: suggestedUsers,
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
}

export const followOrUnfollow = async (req, res) => {
    try {
        const followkrnewala = req.id;
        const jiskofollowkarunga = req.params.id;

        if (followkrnewala === jiskofollowkarunga) {
            return res.status(400).json({
                message: "Cannot follow yourself!",
                success: false,
            });
        }
        let user = await User.findById(followkrnewala);
        const targetUser = await User.findById(jiskofollowkarunga);
        if (!user || !targetUser) {
            return res.status(404).json({
                message: "User not found!",
                success: false,
            });
        }
        //follow and unfollow check

        // const isFollowing = await user.includes(jiskofollowkarunga);

        const isFollowing = user.following.some(id => id.toString() === jiskofollowkarunga);

        if (isFollowing) {
            //unfollow logic
            await Promise.all([
                User.updateOne({ _id: followkrnewala }, { $pull: { following: jiskofollowkarunga } }),
                User.updateOne({ _id: jiskofollowkarunga }, { $pull: { followers: followkrnewala } })
            ])
            return res.status(200).json({
                message: "Unfollowed successfully!",
                success: true,
            })
        }
        else {
            //follow logic
            await Promise.all([
                User.updateOne({ _id: followkrnewala }, { $push: { following: jiskofollowkarunga } }),
                User.updateOne({ _id: jiskofollowkarunga }, { $push: { followers: followkrnewala } })
            ])
            return res.status(200).json({
                message: "Followed successfully!",
                success: true,
            })
        }
    } catch (error) {
        console.log(error);
    }
}