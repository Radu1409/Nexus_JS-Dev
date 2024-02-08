import FollowButton from "@/components/shared/FollowButton";
import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useGetRecentPosts, useGetUserById, useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const { data: posts, isPending: isPostLoading, isError:
    isErrorPosts } = useGetRecentPosts();

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
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md: h2-bold text-left w-full">Home
          Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption}/>
              ))}

            </ul>
          )}
        </div>
      </div>
        {/* <div className="home-creators"> */}
        <div className="common-container">
          {/* <h2 className="h3-bold md: h2-bold text-left w-full"> */}
          <h2 className="h3-bold md: h2-bold text-left w-full">
            Top Creators</h2>

            {isLoading && !allUsers ? (
          <Loader />
          ) : (
          // <ul className='grid-container-users flex-between gap-6 
          // md:gap-6 w-full 
          // '>
            <ul className='user-grid
          '>
            {allUsers?.documents.map((post) => (
              (currentUser.$id !== post.$id) && 
            <div className='w-22 h-full border  border-gray-500 py-10 items-center justify-center flex  rounded-xl'>
              <div className='flex flex-col gap-1 justify-center items-center'>
                <img 
                  src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
                  className='w-10 h-10 rounded-full gap-4 mb-2'
                />
                <h1 className='text-[10px]'>{post.name}</h1>
                <p className='text-[8px] text-primary-500 mb-4'>@{post.username}</p>
                <FollowButton currentPage={"Hom"} />
              </div>

            </div>
            ))}
          </ul>
        )}
      
        </div>
    </div>
  )
}

export default Home