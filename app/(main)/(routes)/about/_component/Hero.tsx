import Image from "next/image";

const Hero = () => {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-x-10 gap-y-8 px-2.5 sm:px-10 lg:flex-row">
      <div className="absolute right-0 top-16 -z-50 h-[43rem] w-1/2 bg-gradient-to-l from-red-100 via-violet-100 to-transparent blur-xl" />
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="w-full text-4xl font-bold md:text-5xl lg:w-2/3">
          About Artist Casting Explorer
        </h1>
        <p className="w-full text-muted-foreground lg:w-4/5 ">
          This is a general information website dedicated to artists such as
          actors, models, entertainers, and creators in film industries and show
          businesses geographically located in Canada and Japan. You will
          discover creative and passionate artists.
          <br />
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
