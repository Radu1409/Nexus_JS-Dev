import React from 'react'

type FollowButtonList = {
  currentPage?: string;
}
const FollowButton = ({currentPage} : FollowButtonList) => {
  return (
    <div className={`flex flex-row items-center gap-2 ${currentPage == 'Home' ? 'px-2 py-2' : 'px-8 py-2'} bg-purple-500 hover:bg-purple-600 rounded-lg cursor-pointer`}>
        <h2 className={`${currentPage == 'Home' ? 'text-[10px]' : 'text-[12px]'}  font-medium leading-[140%] `}>Follow</h2>
    </div>
  )
}

export default FollowButton