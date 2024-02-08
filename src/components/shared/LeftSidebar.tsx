import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'
import { INavLink } from '@/types'
import { sidebarLinks } from '@/constants'

const LeftSidebar = () => {
  const { pathname } = useLocation()
  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [isHovered, setIsHovered] = useState(false);
  const [containerHeight, setContainerHeight] = useState('352px');
  const [prevWindowHeight, setPrevWindowHeight] = useState(window.innerHeight);
  const [value, setValue] = useState(2);


  useEffect(() => {
    function handleResize() {
      const currentWindowHeight = window.innerHeight;

      // Actualizează înălțimea containerului la 90% din înălțimea vizuală a ecranului
      setContainerHeight(`${currentWindowHeight / value}px`);

      // Verifică dacă trebuie să ajustezi variabila value
      if (currentWindowHeight > prevWindowHeight) {
        // Decrementez value cu 0.1, asigurându-mă că rămâne în intervalul [1.7, 2]
        setValue((prevValue) => Math.max(prevValue - 0.1, 1.7));
      } else if (currentWindowHeight < prevWindowHeight) {
        // Incrementez value cu 0.1, asigurându-mă că rămâne în intervalul [1.7, 2]
        setValue((prevValue) => Math.min(prevValue + 0.1, 2));
      }

      // Actualizează valoarea anterioară a înălțimii ferestrei
      setPrevWindowHeight(currentWindowHeight);
    }
    
    if (isSuccess) {
      navigate(0);
    }

    // Adaugă un eveniment pentru a asculta modificările la redimensionarea ecranului
    window.addEventListener('resize', handleResize);

    // Inițializează înălțimea containerului
    handleResize();

    // Dezabonează evenimentul la demontarea componentei
    // Verifică condiția pentru a decide dacă navighezi sau nu
    

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [value, prevWindowHeight, isSuccess, navigate]);

  
  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11 '>
        <Link to='/' className='flex gap-3 items-center'>
            <img 
              src="/assets/images/logo.svg"
              alt='logo'
              width={170}
              height={36}
            />
        </Link>

        <Link to={`/profile/${user.id}`}
        className='flex gap-3 items-center'>
          <img 
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt='profile'
            className='h-14 w-14 rounded-full'
          />
          <div className='flex flex-col'>
            <p className='body-bold'>
              {user.name}
            </p>
            <p className='small-regular text-light-3'>
              @{user.username}
            </p>

          </div>
        </Link>
         
          <div className={`overflow-y-scroll  custom-scrollbar ${isHovered ? '' : 'custom-scrollbar-hide'}`}
              style={{ maxHeight: containerHeight }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              >
            <ul className='flex flex-col gap-6 '>
              {sidebarLinks.map((link: INavLink) => {
                const isActive = pathname ===link.route
                
                return (
                  <li 
                    key={link.label}
                    className={`leftsidebar-link group 
                    
                    ${ isActive && 'bg-primary-600'
                    }`}>
                    <NavLink
                      to={link.route}
                      className='flex gap-4 items-center p-4'
                    >
                      <img 
                        src={link.imgURL}
                        alt={link.label}
                        className={`group-hover:invert-white
                        ${ isActive && 
                          'invert-white'
                        }`}
                      />
                      {link.label}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>

      </div>

      <div className='mt-10'>
        <Button 
          variant='ghost' 
          className='shad-button_ghost'
          onClick={() => signOut()}>  
            <img src="/public/assets/icons/logout.svg" alt='logout'/>
            <p className='small-medium lg:base-medium'>
              Logout
            </p>
        </Button>
        
        <Button 
          variant='ghost' 
          className='shad-button_ghost'
          onClick={() => {}}>  
            <img src="/public//assets/icons/settings.svg" alt='settings'/>
            <p className='small-medium lg:base-medium'>
              Settings
            </p>
        </Button>
      </div>
      

    </nav>
  )
}

export default LeftSidebar