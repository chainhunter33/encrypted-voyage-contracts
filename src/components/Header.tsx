import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/WalletConnect";
import logo from "@/assets/logo.png";

const Header = () => {

  return (
    <header className="relative z-50 flex items-center justify-between p-6 lg:px-8">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Encrypted Voyage Contracts" className="h-12 w-auto" />
        <div className="hidden sm:block">
          <h1 className="text-2xl font-bold text-foreground">Encrypted Voyage</h1>
          <p className="text-sm text-muted-foreground">Maritime Contracts</p>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <a 
          href="#contracts" 
          className="text-foreground hover:text-primary transition-colors cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contracts')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Contracts
        </a>
        <a 
          href="#tracking" 
          className="text-foreground hover:text-primary transition-colors cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Tracking
        </a>
        <a 
          href="#about" 
          className="text-foreground hover:text-primary transition-colors cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          About
        </a>
      </nav>

      <WalletConnect />
    </header>
  );
};

export default Header;