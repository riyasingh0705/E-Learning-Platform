import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import FeaturedCourses from "../components/FeaturedCourses/FeaturedCourses";
import Statistics from "../components/Statistics/Statistics";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Testimonials from "../components/Testimonials/Testimonials";
import FAQ from "../components/FAQ/FAQ";
import Newsletter from "../components/Newsletter/Newsletter";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedCourses />
      <Statistics />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </>
  );
}

export default Home;