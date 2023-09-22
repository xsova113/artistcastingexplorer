import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="relative h-12 w-40">
      <img
        src={"/logo-no-background.png"}
        alt={"logo"}
        className="object-contain"
      />
    </Link>
  );
};

export default Logo;
