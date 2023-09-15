import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="w-40 h-12 relative">
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
