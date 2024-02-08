import { Models } from 'appwrite';

import { Link } from 'react-router-dom';
import { Input } from '../ui/input';

type CommentLabelProps = {
    post?: Models.Document
    userId: string;
}

const CommentLabel = ({ post, userId }: CommentLabelProps) => {
  return (
    <div className='flex-between py-2 space-x-2 mt-6 mr-4 ' >
      <Link 
          to={`/profile/${post?.creator.$id}`}>
          <img 
            src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt='creator'
            className="rounded-full w-10 lg:h-9"
          />
      </Link>

      <Input 
            type='text'
            placeholder='Write your comment...'
            className='comment-write text-[13px] font-serif font-normal'
      />
      <img 
        src='/public/assets/icons/vector-orange.svg'
        alt='send'
        className="w-5 h-5 "
      />
    </div>
  )
}

export default CommentLabel