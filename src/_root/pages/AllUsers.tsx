import FollowButton from '@/components/shared/FollowButton';
import Loader from '@/components/shared/Loader';
import { useToast } from '@/components/ui/use-toast';
import { useUserContext } from '@/context/AuthContext';
import { useGetUserById, useGetUsers } from '@/lib/react-query/queriesAndMutations';

const AllUsers = () => {
  const { toast } = useToast();

  const { data: allUsers, isLoading, isError: isErrorCreators } = useGetUsers();
  const { user } = useUserContext()
  const { data: currentUser } = useGetUserById(user.id || "");
  
  if (!currentUser)
  return (
    <div className="flex-center w-full h-full">
      <Loader />
    </div>
  );
    console.log(currentUser)
  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return;
  }


  return (
    <div className=' flex flex-col flex-1 p-8 md:p-14 gap-4 overflow-y-scroll custom-scrollbar '
      >
      <div className='flex flex-row gap-2 xs:mb-4 '>
        <img className='w-9 h-9 invert-white'
          src='/public/assets/icons/people.svg'
        />
        <h1 className='text-[26px]'>All Users</h1>
      </div>
      {isLoading && !allUsers ? (
          <Loader />
        ) : (
        <div className='grid-container-users flex-wrap gap-6 
        md:gap-6 w-full 
        '>
          {allUsers?.documents.map((post) => (
            (currentUser.$id !== post.$id) && 
          <div className='w-22 h-full border  border-gray-500 py-10 items-center justify-center flex  rounded-xl'>
            <div className='flex flex-col gap-1 justify-center items-center'>
              <img 
                src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
                className='w-20 h-20 rounded-full gap-4 mb-2'
              />
              <h1 className=''>{post.name}</h1>
              <p className='text-[12px] text-primary-500 mb-4'>@{post.username}</p>
              <FollowButton />
            </div>

          </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllUsers