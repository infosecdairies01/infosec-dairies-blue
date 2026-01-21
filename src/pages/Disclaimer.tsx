import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Disclaimer = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">Disclaimer</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Educational Purpose Only</h2>
            <p>
              All content, courses, materials, and information provided by InfosecDairies are intended solely 
              for educational and informational purposes. The cybersecurity techniques, tools, and methodologies 
              discussed are meant to help you understand defensive security concepts and improve your skills 
              as a security professional.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Ethical Use Requirement</h2>
            <p>
              By using our platform, you agree to use all knowledge and skills gained exclusively for lawful 
              and ethical purposes. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Protecting systems and networks you are authorized to defend</li>
              <li>Conducting security testing only with proper authorization</li>
              <li>Reporting vulnerabilities through responsible disclosure</li>
              <li>Contributing to the cybersecurity community positively</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. No Guarantee of Results</h2>
            <p>
              While we strive to provide high-quality educational content, we make no guarantees regarding:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Passing certification exams</li>
              <li>Job placement or career advancement</li>
              <li>Specific learning outcomes</li>
              <li>The applicability of content to your specific situation</li>
            </ul>
            <p>
              Success depends on individual effort, prior knowledge, and various external factors.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Content Accuracy</h2>
            <p>
              We make every effort to ensure our content is accurate and up-to-date. However, the cybersecurity 
              field evolves rapidly, and some information may become outdated. We encourage users to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Verify information from multiple sources</li>
              <li>Stay updated with current industry practices</li>
              <li>Report any inaccuracies you discover</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Third-Party Tools and Resources</h2>
            <p>
              Our courses may reference third-party tools, software, or resources. We are not responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The functionality or security of third-party tools</li>
              <li>Changes to third-party services or pricing</li>
              <li>Any damages resulting from the use of third-party tools</li>
              <li>Content on external websites we may link to</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Lab Environments</h2>
            <p>
              Any hands-on exercises or labs should only be performed in authorized, isolated environments. 
              Never test security techniques on systems you do not own or have explicit permission to test. 
              InfosecDairies is not responsible for any consequences of unauthorized testing.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Professional Advice</h2>
            <p>
              The content on InfosecDairies does not constitute professional security consulting, legal advice, 
              or any other professional service. For specific security implementations or legal matters, 
              consult with qualified professionals.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Limitation of Liability</h2>
            <p>
              InfosecDairies, its creators, instructors, and affiliates shall not be held liable for any 
              damages, losses, or legal consequences arising from the use or misuse of information, techniques, 
              or skills learned through our platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. User Responsibility</h2>
            <p>
              You are solely responsible for your actions and for ensuring that your use of knowledge gained 
              from our platform complies with all applicable laws, regulations, and ethical standards in your 
              jurisdiction.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Disclaimer;
