import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';
import SearchResults from '@/components/shared/SearchResults';
import { Input } from '@/components/ui/input';
import { reels_categories } from '@/constants';
import useDebounce from '@/hooks/useDebounce';
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesAndMutations';
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';

const Reels = () => {
    const { ref, inView } = useInView();
    const { data: posts, fetchNextPage, hasNextPage } = useGetPosts()
  
    const [setsearchValue, setSetsearchValue] = useState('')
    const debounceValue = useDebounce(setsearchValue, 500)
    const { data: searchedPosts, isFetching: isSearchFetching}
    = useSearchPosts(debounceValue);
    //const posts = [];
  
    useEffect(() => {
      if(inView && !setsearchValue) fetchNextPage();
    }, [inView, setsearchValue])
    
    if(!posts) {
      return (
        <div className='flex-center w-full h-full'>
          <Loader />
        </div>
      )
    }
    const shouldShowSearchResults = setsearchValue !== '';
    const shouldShowPosts = !shouldShowSearchResults 
          && posts.pages.every((item) => item.documents.length === 0) 
  
    return (
      <div className='flex flex-col flex-1 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar'>
        <div className='explore-inner_container'>
          <h2 className='h3-bold md:h2-bold '>Search Reels</h2>
  
              <div className='flex  gap-1 w-[42rem] rounded-lg bg-dark-4'>
                  <img 
                    src='/public/assets/icons/search.svg'
                    width={24}
                    height={24}
                    alt='search'
                    className='flex ml-4'
                  />
                  <Input 
                    type='text'
                    placeholder='Search Creators'
                    className='explore-search '
                    value={setsearchValue}
                    onChange={(e) => setSetsearchValue(e.target.value)}
                  />
              </div>
          
          <div className='flex gap-8 p-2 text-[10px] text-light-4 border border-dark-4 rounded-[30px] bg-dark-2'>
            #mountain
          </div>
        </div>
        
        <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
            <div className='flex justify-center items-center divide-x divide-gray-900 px-0 py-2 cursor-pointer '>
                {reels_categories.map((reel_category, index) => (
                <button key={reel_category.name} className={`flex items-center gap-2 px-10 py-2  
                        ${ index === 0 ? 'rounded-l-lg' : ''} ${
                        index === reels_categories.length - 1 ? 'rounded-r-lg' : ''}
                        bg-dark-3 hover:bg-dark-4`} >
                    <p className='flex items-center small-medium md:small-medium text-light-2'>
                    {reel_category.name}
                    </p>
                </button>
                ))}
            </div>
        <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium md:base-medium text-light-2'>All</p>
          <img 
            src='/public/assets/icons/filter.svg'
            width={20}
            height={20}
            alt='filter'
          />
        </div>
      </div>

        {/* <div className='flex justify-between w-full max-w-5xl'>
              <div className='flex justify-center items-center divide-x divide-gray-900 px-0 py-2 cursor-pointer '>
                  {reels_categories.map((reel_category, index) => (
                    <button key={reel_category.name} className={`flex items-center gap-2 px-12 py-2  
                            ${ index === 0 ? 'rounded-l-lg' : ''} ${
                            index === reels_categories.length - 1 ? 'rounded-r-lg' : ''}
                            bg-dark-3 hover:bg-dark-4`} >
                      <p className='flex items-center small-medium md:small-medium text-light-2'>
                        {reel_category.name}
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


        </div> */}
        
  
        <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
          {shouldShowSearchResults ? (
            <SearchResults
              isSearchFetching={isSearchFetching}
              searchedPosts={searchedPosts}
            />
          ) : shouldShowPosts ? (
            <p className='text-light-4 mt-10 text-center w-full'>
              End of Posts
            </p>
          ) : posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents}/>
          ))
        
        }
        </div>
        {hasNextPage && !setsearchValue && (
          <div ref={ref} className='mt-10'>
            <Loader />
          </div>  
        )}
      </div>
    )
}

export default Reels