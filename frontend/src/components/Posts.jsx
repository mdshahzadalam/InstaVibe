import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'
import Banner from './Banner';
import MyName from './MyName';


const Posts = () => {
    const { posts } = useSelector(store => store.post);
    return (

        <div >

            <div>
                <MyName/>
            </div>
            <div >
                <Banner />
            </div>
            {
                posts.map((post) => <Post key={post._id} post={post} />)
            }
        </div>
    )
}

export default Posts
