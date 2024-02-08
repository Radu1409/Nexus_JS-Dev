import { IUser } from '@/types'
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'

type PostCardProps = {
  user: IUser
}

const EditButton = ( {user} : PostCardProps) => {
  return (
    // <div className='flex flex-row items-center gap-2 px-4 bg-dark-3 hover:bg-dark-4 rounded-lg cursor-pointer'>
    <div>
      <Link to={`/update-profile/${user.id}`}
            className='flex flex-row items-center gap-2 px-4 py-2 bg-dark-3 hover:bg-dark-4 rounded-lg cursor-pointer'>
          <img 
              src='/public/assets/icons/edit-orange.svg'
              width={14}
              ></img>
          <h2 className='tiny-medium '>Edit Profile</h2>
      </Link>
   </div>
  )
}

export default EditButton