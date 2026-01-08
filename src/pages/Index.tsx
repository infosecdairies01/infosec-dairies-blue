import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Topics from "@/components/Topics";
import WhyChooseUs from "@/components/WhyChooseUs";
import LearningPath from "@/components/LearningPath";
import Certifications from "@/components/Certifications";
import CTA from "@/components/CTA";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Topics />
      <LearningPath />
      <WhyChooseUs />
      <Certifications />
      <CTA />
      
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InfosecDairies. All rights reserved.</p>
          <p className="mt-2">Blue Team Cybersecurity Education &amp; Insights</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
