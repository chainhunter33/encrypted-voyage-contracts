import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContractsSection = () => {
  return (
    <section id="contracts" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Smart Contracts
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionary encrypted contracts that remain hidden until delivery completion, 
            ensuring fair execution and preventing manipulation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="maritime-shadow hover:glow-effect transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Create Contract</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Set up encrypted shipping agreements with automatic execution upon delivery confirmation.
              </p>
              <Button className="teal-gradient hover:opacity-90 transition-opacity w-full">
                Start New Contract
              </Button>
            </CardContent>
          </Card>

          <Card className="maritime-shadow hover:glow-effect transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Manage Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                View and manage your active shipping contracts and their current status.
              </p>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View Contracts
              </Button>
            </CardContent>
          </Card>

          <Card className="maritime-shadow hover:glow-effect transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Contract History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Access completed contracts and transaction history for audit and compliance.
              </p>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContractsSection;