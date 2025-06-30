import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import ServicesSection from "../components/ServicesSection";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
    
    
      <main className="flex-grow">
        <HeroSection />
         <ServicesSection/>
      </main>

    </div>
  );
};

export default Home;
