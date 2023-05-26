import Image from "next/image";
import { useRouter} from "next/navigation";
import { useCallback } from "react";


import useCurrentUser from '@/hooks/useCurrentUser';


const Avatar = ({ userId, isLarge, hasBorder,isProfile,isSmall}) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

 

  const onClick = useCallback((event) => {

    

    event.stopPropagation();
    if(currentUser?.id === userId){
      const url = `/users/${userId}`;
      router.push(url);
    }else return

  }, [router, userId]);

  return (
    <div
      className={`

      rounded-full 
      hover:opacity-90 
      transition 
      cursor-pointer
      flex 
      items-center 
      justify-center
      ${isLarge && 'h-[36px] w-[36px]'}
      ${isSmall && 'h-[25px] w-[25px]'}

      ${isProfile && ' h-32  w-32'}
        
      `}
    >
      <Image
        style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }}
        alt="Avatar"
        height={25}
        width={25}
        className={` 
            ${isLarge && 'h-[36px] w-[36px]' }
            ${isSmall && 'h-[25px] w-[25px]'}
            ${isProfile && 'h-32 w-32' }`}
            
        onClick={onClick}
        src={currentUser?.id === userId && currentUser?.profileImage!==null ?  `${currentUser?.profileImage}`:'/assets/icons/user.svg'}
      />
    </div>
  );
}
 
export default Avatar;