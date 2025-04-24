import { useEffect, useState } from 'react'
import './App.css'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import ChatPage from './components/ChatPage'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { setOnlineUsers } from './Redux/chatSlice'
import { setSocket } from './Redux/socketSlice'
import { setLikeNotification } from './Redux/rtnSlice'
import ProtectedRoutes from './components/ProtectedRoutes'

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element:  <ProtectedRoutes> <MainLayout /> </ProtectedRoutes> ,
    children: [
      {
        path: '/',
        element:  <ProtectedRoutes> <Home /> </ProtectedRoutes> 
      },
      {
        path: '/profile/:id',
        element: <ProtectedRoutes> <Profile /> </ProtectedRoutes> 
      },
      {
        path: '/account/edit',
        element: <ProtectedRoutes> <EditProfile /> </ProtectedRoutes>
      },
      {
        path: '/chat',
        element: <ProtectedRoutes> <ChatPage /> </ProtectedRoutes>
      },

    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);


function App() {
  // const [count, setCount] = useState(0)

  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:8080', {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));
      // socket.emit("event", data);

      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
