import Navbar from "@/components/Navbar";

const Courses = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 py-20">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                <span className="text-2xl">📚</span>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse animation-delay-200">
                <span className="text-2xl">🎓</span>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse animation-delay-400">
                <span className="text-2xl">💡</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              Courses Coming Soon
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              We're crafting comprehensive cybersecurity courses to help you master blue team operations and defensive security.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur">
                <h3 className="text-lg font-semibold mb-2">Beginner Friendly</h3>
                <p className="text-sm text-muted-foreground">Start from the basics and build a strong foundation</p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur">
                <h3 className="text-lg font-semibold mb-2">Hands-On Labs</h3>
                <p className="text-sm text-muted-foreground">Practice with real-world scenarios and exercises</p>
              </div>
              <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur">
                <h3 className="text-lg font-semibold mb-2">Expert Instruction</h3>
                <p className="text-sm text-muted-foreground">Learn from experienced security professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InfosecDairies. All rights reserved.</p>
          <p className="mt-2">Blue Team Cybersecurity Education &amp; Insights</p>
        </div>
      </footer>
    </main>
  );
};

export default Courses;
