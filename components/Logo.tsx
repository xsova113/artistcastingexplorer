import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="relative h-24 w-24 -my-1">
      <Image src={"/logo.png"} fill alt={"logo"} className="object-contain" />
    </Link>
  );
};

export default Logo;
