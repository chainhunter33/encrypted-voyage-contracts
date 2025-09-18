import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            About Hidden RWA
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing global shipping through blockchain technology and encrypted contracts,
            ensuring transparency, security, and trust in international trade.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <Card className="maritime-shadow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To eliminate contract exploitation and fraud in international shipping by creating 
                a transparent, secure, and automated platform where agreements remain encrypted 
                until delivery completion, ensuring fair execution for all parties involved.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="maritime-shadow hover:glow-effect transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 text-foreground">Blockchain Security</h3>
                <p className="text-muted-foreground">
                  Our platform leverages advanced blockchain technology to ensure contract 
                  immutability and transparent verification of all shipping milestones.
                </p>
              </CardContent>
            </Card>

            <Card className="maritime-shadow hover:glow-effect transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 text-foreground">Global Network</h3>
                <p className="text-muted-foreground">
                  Connected to major shipping routes worldwide, providing real-time tracking 
                  and verification across international waters and customs checkpoints.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="maritime-shadow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Why Choose Hidden RWA?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">Contract Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">$2.5B</div>
                  <div className="text-sm text-muted-foreground">Total Value Secured</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">150+</div>
                  <div className="text-sm text-muted-foreground">Countries Covered</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;