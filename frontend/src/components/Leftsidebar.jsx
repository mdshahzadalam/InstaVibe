import React, { useEffect, useState } from 'react'
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'  // ✅ Import Avatar
import { Link, useNavigate } from 'react-router-dom'
// import { Link as RouterLink } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/Redux/authSlice'
import CreatePost from './CreatePost'
import { setPosts, setSelectedPost } from '@/Redux/postSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'

import logo from '../assets/logo.jpg';



const Leftsidebar = () => {

  const navigate = useNavigate();

  const { user } = useSelector(store => store.auth);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { likeNotification } = useSelector(store => store.realTimeNotification);




  // const [showNotifications, setShowNotifications] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  const [unseenLikeNotifications, setUnseenLikeNotifications] = useState([]);

  // Track unseen notifications
  useEffect(() => {
    const seenLikeIds = JSON.parse(localStorage.getItem("seenLikeIds") || "[]");

    // Get only unseen notifications
    const newUnseen = likeNotification.filter(n => !seenLikeIds.includes(n._id));
    setUnseenLikeNotifications(newUnseen);
    setHasNewNotifications(newUnseen.length > 0);
  }, [likeNotification]);

  const handleOpenNotifications = () => {
    setShowNotifications(true);

    // Mark current unseen ones as seen
    const seenLikeIds = JSON.parse(localStorage.getItem("seenLikeIds") || "[]");
    const newSeen = [...new Set([...seenLikeIds, ...unseenLikeNotifications.map(n => n._id)])];

    localStorage.setItem("seenLikeIds", JSON.stringify(newSeen));
    setHasNewNotifications(false);
  };







  // Mark all current notifications as seen
  //   const seenIds = likeNotification.map(n => n.userId);
  //   localStorage.setItem("seenLikeNotificationIds", JSON.stringify(seenIds));
  //   setHasNewNotifications(false);
  // };












  const logoutHandler = async () => {
    try {
      const res = await axios.get('https://instavibe-1l6d.onrender.com/api/v1/user/logout', {
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }


  // const createPostHandler = ()=>{
  //   setOpen(true);
  // }

  const sidebarHandler = (textType) => {
    if (textType === 'Logout') {
      logoutHandler();
    } else if (textType === "Create") {
      setOpen(true);
      // createPostHandler();
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Messages") {
      navigate("/chat");
    }
  }


  const SidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className='w-6 h-6'>
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>
            {user?.username?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ), text: "Profile"
    },
    { icon: <LogOut />, text: "Logout" }
  ]


  return (
    <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen   '>
      <div className='flex flex-col  w-20 md:w-24 lg:w-28'>
        {/* <h1 className='my-8 pl-3 font-bold text-xl'>InstaVibe</h1> */}


        <div className="flex items-center my-8">
          {/* Large screen text */}
          <Link
            to="/"
            className="hidden md:block pl-2 cursor-pointer"
          >
            <h1 className="text-2xl font-bold font-[cursive]">InstaVibe</h1>
          </Link>

          {/* Small screen logo */}
          <Link
            to="/"
            className="block md:hidden pl-2 cursor-pointer w-10 rounded-lg hover:bg-white/20"
          >
            <img
              // src="/logo.jpg"
              src={logo}
              alt="Logo"
              className="w-20 rounded-[10px]"
            />
          </Link>
        </div>





        <div className=''>
          {
            SidebarItems.map((Items, index) => {
              const isNotification = Items.text === "Notifications";
              return (
                <div onClick={() => sidebarHandler(Items.text)} key={index} className='  flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
                  {Items.icon}
                  <span className='hidden  lg:inline '>{Items.text}</span>


                  {/* {
                    Items.text === "Notifications" && likeNotification.length > 0 && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button    onClick={() => setShowNotifications(prev => !prev)} size='icon' className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6 cursor-pointer">{likeNotification.length}</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div>
                            {
                              likeNotification.length === 0 ? (<p>No new notification</p>) : (
                                likeNotification.map((notification) => {
                                  return (
                                    <div key={notification.userId} className='flex items-center gap-2 my-2'>
                                      <Avatar>
                                        <AvatarImage src={notification.userDetails?.profilePicture} />
                                        <AvatarFallback>
                                          {notification.userDetails?.username?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                      </Avatar>
                                      <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
                                    </div>
                                  )
                                })
                              )
                            }
                          </div>
                        </PopoverContent>
                      </Popover>
                    )
                  } */}






                  {isNotification && (
                    <>
                      {/* Red dot only if new notifications exist */}
                      {unseenLikeNotifications.length > 0 && hasNewNotifications && !showNotifications && (
                        <Button
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenNotifications();
                          }}
                          className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-700 absolute bottom-6 left-6 cursor-pointer z-50"
                        >
                          {unseenLikeNotifications.length}
                        </Button>
                      )}

                      {/* Notification panel */}
                      {showNotifications && (
                        <div
                          className="absolute left-16 top-0 bg-white shadow-md rounded-lg w-72 p-4 z-50 max-h-80 overflow-y-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-bold">Notifications</p>
                            <button
                              onClick={() => setShowNotifications(false)}
                              className="text-sm text-blue-500 hover:underline"
                            >
                              Close
                            </button>
                          </div>

                          {unseenLikeNotifications.length === 0 ? (
                            <p className="text-sm text-gray-500">No new notifications</p>
                          ) : (
                            unseenLikeNotifications.map((notification) => (
                              <div key={notification._id} className="flex items-center gap-3 py-2 border-b">
                                <Avatar>
                                  <AvatarImage src={notification.userDetails?.profilePicture} />
                                  <AvatarFallback>
                                    {notification.userDetails?.username?.charAt(0).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <p className="text-sm">
                                  <strong>{notification.userDetails?.username}</strong> liked your post
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </>
                  )}








                </div>
              )
            })
          }
        </div>
      </div>

      <CreatePost open={open} setOpen={setOpen} />
    </div>
  )
}

export default Leftsidebar
