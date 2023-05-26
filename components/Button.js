'use client';

import { IconType } from "react-icons";



const Button = ({
    label,
    onClick,
    disabled,
    small,
    green,
    grey,
    red,
    icon: Icon,
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
        flex justify-center items-center gap-[10px] px-[33px] font-semibold  rounded-[15px] shadow-01 disabled:cursor-not-allowed
        ${green && `bg-[#87A273]  border-0 text-white hover:bg-[#FFFFFF] hover:border-[2px] hover:border-solid hover:border-[#87A273] hover:text-[#87A273] `}
        ${grey && ` bg-grey-linear   `}
        ${red && `bg-[#FF0000]  border-0 text-white hover:bg-[#FFFFFF] hover:border-[2px] hover:border-solid hover:border-[#FF0000] hover:text-[#FF0000] `}

        ${small ? ` h-[35px] ` : `h-[50px] `}

      `}
        >
            {Icon && (
                <Icon
                    size={24}
                    className="
            absolute
            left-4
            top-3
          "
                />
            )}
            <div className={` flex items-center justify-center 
                            ${small ? `  text-[20px]  leading-[25px]` : ` text-[24px]  leading-[30px]`}
                            ${grey && `text-grey-linear`}
      `}> {label}</div>


        </button>
    );
}

export default Button;