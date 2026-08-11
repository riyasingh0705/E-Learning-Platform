import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import FeaturedCourses from "../components/FeaturedCourses/FeaturedCourses";
import Statistics from "../components/Statistics/Statistics";
import Testimonials from "../components/Testimonials/Testimonials";
import FAQ from "../components/FAQ/FAQ";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedCourses />
      <Statistics />
      <Testimonials />
      <FAQ />
    </>
  );
}

export default Home;