import Image from "next/image";

const Hero = () => {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-x-10 gap-y-8 px-2.5 sm:px-10 lg:flex-row">
      <div className="absolute right-0 top-16 -z-50 h-[43rem] w-1/3 bg-gradient-to-l from-red-100 via-violet-100 to-transparent blur-xl" />
      <div className="flex flex-col gap-6">
        <h1 className="w-full text-4xl font-bold md:text-5xl lg:w-2/3">
          About Artist Casting Explorer
        </h1>
        <p className="w-full text-muted-foreground lg:w-2/3 ">
          This is a general information website dedicated to artists such as
          actors, models, entertainers, and creators in film industries and show
          businesses geographically located in Canada and Japan. You will
          discover creative and passionate artists.
          <br /> Some individuals within the group were born in Japan, bringing
          with them firsthand experience in the Japanese entertainment industry,
          and are currently active in Canada. Meanwhile, others were either born
          in Canada or possess significant connections to Japan in various
          capacities.
        </p>
      </div>

      <div className="relative">
        <Image src={""} alt="" fill />
      </div>
      <div className="relative">
        <Image src={""} alt="" fill />
      </div>
    </div>
  );
};

export default Hero;
