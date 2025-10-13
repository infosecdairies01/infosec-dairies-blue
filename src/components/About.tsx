import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur border-border p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              <span className="gradient-text">About InfosecDairies</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                InfosecDairies is your trusted source for blue team cybersecurity knowledge. 
                We focus on defensive security strategies, helping security professionals and 
                enthusiasts understand the art of protection, detection, and response.
              </p>
              
              <p className="text-lg">
                Our mission is to demystify complex security concepts and provide actionable 
                insights that can be applied in real-world scenarios. Whether you're a seasoned 
                security analyst or just starting your journey in cybersecurity, we've got you covered.
              </p>
              
              <div className="pt-6">
                <h3 className="text-xl font-semibold mb-4 gradient-text">What We Cover:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">▸</span>
                    <span>Security Operations Center (SOC) best practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">▸</span>
                    <span>Threat hunting techniques and methodologies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">▸</span>
                    <span>Digital forensics and incident analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">▸</span>
                    <span>Security tool reviews and tutorials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">▸</span>
                    <span>Industry news and threat intelligence</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
