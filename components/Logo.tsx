import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="relative h-28 w-28 -my-3">
      <Image src={"/aceLogo.png"} fill alt={"logo"} className="object-contain" />
    </Link>
  );
};

export default Logo;
