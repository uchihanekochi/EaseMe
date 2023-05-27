import React from "react";
import Link from "next/link";
import Image from "next/image";
const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        src={"/assets/images/LogoEaseME.svg"}
        width={127}
        height={35}
        alt="logo"
      />
    </Link>
  );
};

export default Logo;
