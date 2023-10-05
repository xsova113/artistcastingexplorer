import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="relative h-11 w-40">
      <Image
        src={"/logo-no-background.png"}
        alt={"logo"}
        fill
        className="object-contain"
      />
    </Link>
  );
};

export default Logo;
