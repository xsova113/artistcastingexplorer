import FAQ from "./_component/FAQ";
import Hero from "./_component/Hero";
import Mission from "./_component/Mission";
import Perks from "./_component/Perks";

const AboutPage = () => {
  return (
    <section className="flex flex-col py-24">
      <Hero />
      <Mission />
      <Perks />
      <FAQ />
    </section>
  );
};

export default AboutPage;
