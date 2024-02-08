import { useUserContext } from '@/context/AuthContext'
import { details, categories } from '@/constants'

import EditButton from '@/components/shared/EditButton'
import FollowButton from '@/components/shared/FollowButton'
import { useGetRecentPosts, useGetUserById } from '@/lib/react-query/queriesAndMutations'
import { Outlet, Route, Routes, useParams } from 'react-router-dom'
import { Models } from 'appwrite'
import { useEffect, useState } from 'react'
import Loader from '@/components/shared/Loader'
import GridPostList from '@/components/shared/GridPostList'
import LikedPosts from './LikedPosts'

const Profile = () => {
  const { id } = useParams()
  const { user } = useUserContext()
  const { data: currentUser } = useGetUserById(id || "");
  
    
  console.log(user)
  console.log(id)
  console.log(currentUser)

  if (!currentUser)
  return (
    <div className="flex-center w-full h-full">
      <Loader />
    </div>
  );

  return (
      <div className="flex flex-1">
        <div className="profile-container "> 
          <div className='profile-inner_container '>

            <div className='flex gap-4'>
              <img 
                src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
                alt='profile'
                className='h-32 w-32 rounded-full'
              />
              <div className='flex flex-col gap-1'>
                <div className='flex flex-row gap-20'>
                  <p className='text-3xl '>
                    {user.name}
                  </p>
                  {currentUser.$id === user.id ?
                  <EditButton user={user} /> : (
                    <div className='flex gap-2'>
                      <FollowButton />
                      <div className='flex flex-row items-center gap-2 px-6 bg-white hover:bg-slate-200 rounded-lg cursor-pointer'>
                        <h2 className='text-[12px] font-medium leading-[140%] text-black'>Message</h2>
                      </div>
                    </div>
                  )}


                </div>
                <p className='text-sm text-light-3'>
                  @{user.username}
                </p>
                <div className='flex flex-row my-4 gap-10 items-start'>
                  {details.map((detail) => (
                    <button key={detail.name}>
                      <p className='text-primary-500'>{detail.num}</p>
                      <span>{detail.name}</span>
                    </button>
                  ))}
                </div>
                <div className='text-xs space-y-0.5'>
                  <p>✅Capturing the essence of nature through my lens</p>
                  <p>🎶In every walk with nature, one receives for more than he seeks.</p>
                </div>
              </div>
              
            </div>
           
          </div>
          
            <div className='flex justify-between'>
              <div className='flex justify-center items-center divide-x divide-gray-900 px-0 py-2 cursor-pointer '>
                  {categories.map((category, index) => (
                    <button key={category.icon} className={`flex items-center gap-2 px-12 py-2  
                            ${ index === 0 ? 'rounded-l-lg' : ''} ${
                            index === categories.length - 1 ? 'rounded-r-lg' : ''}
                            bg-dark-3 hover:bg-dark-4`} >
                      <img 
                        className='' 
                        src={`${category.icon}`}
                        width={16}
                        height={16}
                        alt={`${category.icon}`}
                      />
                      <p className='flex items-center small-medium md:small-medium text-light-2'>
                        {category.name}
                      </p>
                    </button>
                  ))}
              </div>
              
              <div className='flex justify-center items-center  px-0 py-2 cursor-pointer'>
                <button className='flex items-center gap-2 px-4 py-2 rounded-md bg-dark-3'>
                  <p className='flex items-center small-medium md:base-medium text-light-2'>All</p>
                  <img 
                    src='/public/assets/icons/filter.svg'
                    width={16}
                    height={16}
                    alt='filter'
                  />
                </button>
              </div>


            </div>

          <Routes>
            <Route
              index
              element={<GridPostList posts={currentUser.posts} showUser={false} />}
            />
            {currentUser.$id === user.id && (
              <Route path="/liked-posts" element={<LikedPosts />} />
            )}
            </Routes>
          <Outlet />

        </div>
      </div>
  )
}

export default Profile