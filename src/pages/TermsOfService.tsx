import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using InfosecDairies, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Description of Services</h2>
            <p>
              InfosecDairies provides cybersecurity education and training services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Online courses and tutorials on blue team cybersecurity</li>
              <li>Interactive labs and hands-on exercises</li>
              <li>Quizzes and assessments</li>
              <li>Certification preparation materials</li>
              <li>Community access and resources</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. User Accounts</h2>
            <p>To access certain features, you may need to create an account. You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use our services for any illegal or unauthorized purpose</li>
              <li>Share your account credentials with others</li>
              <li>Redistribute, copy, or resell course materials without permission</li>
              <li>Attempt to hack, disrupt, or damage our services</li>
              <li>Use knowledge gained for malicious purposes</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Upload malicious content or malware</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Intellectual Property</h2>
            <p>
              All content on InfosecDairies, including courses, materials, logos, and trademarks, is owned by 
              InfosecDairies or its content creators and is protected by intellectual property laws. You may not 
              reproduce, distribute, or create derivative works without our express written consent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Educational Purpose</h2>
            <p>
              All cybersecurity techniques, tools, and knowledge shared on this platform are intended for 
              educational and defensive purposes only. Users must:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Only practice skills in authorized environments</li>
              <li>Follow responsible disclosure practices</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Use knowledge ethically and professionally</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Limitation of Liability</h2>
            <p>
              InfosecDairies is provided "as is" without warranties of any kind. We are not liable for any 
              damages arising from your use of our services, including but not limited to direct, indirect, 
              incidental, or consequential damages.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of our services after 
              changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us through our Telegram channel 
              or LinkedIn profile.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default TermsOfService;
