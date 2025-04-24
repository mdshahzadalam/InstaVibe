
// import React, { useState } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import useGetUserProfile from '@/hooks/useGetUserProfile';
// import { Link, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { AtSign, Heart, MessageCircle } from 'lucide-react';

// const Profile = () => {
//   const params = useParams();
//   const userId = params.id;
//   useGetUserProfile(userId);
//   const [activeTab, setActiveTab] = useState('posts');

//   const { userProfile, user } = useSelector(store => store.auth);

//   const isLoggedInUserProfile = user?._id === userProfile?._id;
//   const isFollowing = false;

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   }

//   const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

//   return (
//     <div className='flex max-w-5xl justify-center mx-auto pl-10'>
//       <div className='flex flex-col gap-20 p-8'>
//         <div className='grid grid-cols-2'>
//           <section className='flex items-center justify-center'>
//             <Avatar className='h-32 w-32'>
//               <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//           </section>
//           <section>
//             <div className='flex flex-col gap-5'>
//               <div className='flex items-center gap-2'>
//                 <span>{userProfile?.username}</span>
//                 {
//                   isLoggedInUserProfile ? (
//                     <>
//                       <Link to="/account/edit"><Button variant='secondary' className='hover:bg-gray-200 h-8 cursor-pointer'>Edit profile</Button></Link>
//                       <Button variant='secondary' className='hover:bg-gray-200 h-8'>View archive</Button>
//                       <Button variant='secondary' className='hover:bg-gray-200 h-8'>Ad tools</Button>
//                     </>
//                   ) : (
//                     isFollowing ? (
//                       <>
//                         <Button variant='secondary' className='h-8'>Unfollow</Button>
//                         <Button variant='secondary' className='h-8'>Message</Button>
//                       </>
//                     ) : (
//                       <Button className='bg-[#0095F6] hover:bg-[#3192d2] h-8'>Follow</Button>
//                     )
//                   )
//                 }
//               </div>
//               <div className='flex items-center gap-4'>
//                 <p><span className='font-semibold'>{userProfile?.posts.length} </span>posts</p>
//                 <p><span className='font-semibold'>{userProfile?.followers.length} </span>followers</p>
//                 <p><span className='font-semibold'>{userProfile?.following.length} </span>following</p>
//               </div>
//               <div className='flex flex-col gap-1'>
//                 <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span>
//                 <Badge className='w-fit' variant='secondary'><AtSign /> <span className='pl-1'>{userProfile?.username}</span> </Badge>
//                 {/* <span>🤯I am {userProfile?.username}.</span>
//                 <span>🤯Enjoy with InstaVibe.</span>
//                 <span>🤯DM for collaboration</span> */}
//                 <span>🙌 Hey, I'm <span className='bg-green-600 text-white px-2.5 py-0.5 rounded-lg text-center justify-center'>{userProfile?.username}</span>!</span>
//                 <span>🎉 Welcome to <span className='bg-green-600 text-white px-2.5 py-0.5 rounded-lg text-center justify-center font-[cursive]'>InstaVibe</span> — where moments come alive.</span>
//                 <span>📩 DM me to collab, share ideas, or just vibe!</span>

//               </div>
//             </div>
//           </section>
//         </div>
//         <div className='border-t border-t-gray-200'>
//           <div className='flex items-center justify-center gap-10 text-sm'>
//             <span className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('posts')}>
//               POSTS
//             </span>
//             <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>
//               SAVED
//             </span>
//             <span className='py-3 cursor-pointer'>REELS</span>
//             <span className='py-3 cursor-pointer'>TAGS</span>
//           </div>
//           <div className='grid grid-cols-3 gap-1'>
//             {
//               displayedPost?.map((post) => {
//                 return (
//                   <div key={post?._id} className='relative group cursor-pointer'>
//                     <img src={post.image} alt='postimage' className='rounded-sm my-2 w-full aspect-square object-cover' />
//                     <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//                       <div className='flex items-center text-white space-x-4'>
//                         <button className='flex items-center gap-2 hover:text-gray-300'>
//                           <Heart />
//                           <span>{post?.likes.length}</span>
//                         </button>
//                         <button className='flex items-center gap-2 hover:text-gray-300'>
//                           <MessageCircle />
//                           <span>{post?.comments.length}</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile














import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector(store => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className='w-full px-4 sm:px-6 lg:px-8 py-6'>
      <div className='max-w-5xl mx-auto flex flex-col gap-10'>
        {/* Profile Header */}
        <div className='flex flex-col lg:flex-row items-center lg:items-start gap-8'>
          <div className='flex justify-center lg:justify-start'>
            <Avatar className='h-32 w-32'>
              <AvatarImage src={userProfile?.profilePicture} alt='profilephoto' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className='flex-1 pl-18 sm:pl-0'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2'>
              <span className='text-lg font-semibold'>{userProfile?.username}</span>
              {isLoggedInUserProfile ? (
                <div className='flex gap-2 flex-wrap'>
                  <Link to='/account/edit'><Button variant='secondary' className='h-8'>Edit profile</Button></Link>
                  <Button variant='secondary' className='h-8'>View archive</Button>
                  <Button variant='secondary' className='h-8'>Ad tools</Button>
                </div>
              ) : (
                <div className='flex gap-2'>
                  {isFollowing ? (
                    <>
                      <Button variant='secondary' className='h-8'>Unfollow</Button>
                      <Button variant='secondary' className='h-8'>Message</Button>
                    </>
                  ) : (
                    <Button className='bg-[#0095F6] hover:bg-[#3192d2] h-8'>Follow</Button>
                  )}
                </div>
              )}
            </div>
            <div className='flex gap-6 mt-4 text-sm'>
              <p><span className='font-semibold'>{userProfile?.posts.length}</span> posts</p>
              <p><span className='font-semibold'>{userProfile?.followers.length}</span> followers</p>
              <p><span className='font-semibold'>{userProfile?.following.length}</span> following</p>
            </div>
            <div className='mt-4 space-y-1'>
              <p className='font-semibold'>{userProfile?.bio || 'bio here...'}</p>
              <Badge variant='secondary' className='w-fit'><AtSign className='w-4 h-4' /><span className='pl-1'>{userProfile?.username}</span></Badge>
              <p className='py-2'>🙌 Hey, I'm <span className='bg-green-600 text-white px-2 py-1 rounded'>{userProfile?.username}</span>!</p>
              <p>🎉 Welcome to <span className='bg-green-600 text-white px-2 py-1 rounded font-cursive'>InstaVibe</span> — where moments come alive.</p>
              <p>📩 DM me to collab, share ideas, or just vibe!</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className='flex-1 pl-18 sm:pl-0'>
          <div className='flex justify-center border-t border-gray-200 pt-4 gap-8 text-sm'>
            {['posts', 'saved', 'reels', 'tags'].map((tab) => (
              <span
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`cursor-pointer py-2 px-4 rounded hover:bg-gray-100 ${activeTab === tab ? 'font-bold border-b-2 border-black' : ''}`}
              >
                {tab.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Posts Grid */}
          <div >
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6'>
              {displayedPost?.map((post) => (
                <div key={post?._id} className='relative group'>
                  <img src={post.image} alt='post' className='rounded w-full aspect-square object-cover' />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className='flex gap-4 text-white'>
                      <span className='flex items-center gap-1'><Heart className='w-4 h-4' /> {post?.likes.length}</span>
                      <span className='flex items-center gap-1'><MessageCircle className='w-4 h-4' /> {post?.comments.length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
