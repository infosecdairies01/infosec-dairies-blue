import Navbar from "@/components/Navbar";

const Labs = () => {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      <div className="absolute inset-0 circuit-pattern opacity-5" />
      
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float-slow" />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center animate-fade-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text animate-shimmer">
            Coming Soon
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground animate-fade-up" style={{ animationDelay: "200ms" }}>
            Blue Team Labs are under development
          </p>
        </div>
      </div>
    </main>
  );
};

export default Labs;
