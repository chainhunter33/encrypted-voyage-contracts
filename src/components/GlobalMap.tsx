import { useEffect, useState } from "react";

interface Ship {
  id: string;
  x: number;
  y: number;
  route: { x: number; y: number }[];
  currentRouteIndex: number;
}

const GlobalMap = () => {
  const [ships, setShips] = useState<Ship[]>([]);

  useEffect(() => {
    // Initialize ships with random routes
    const initialShips: Ship[] = [
      {
        id: "ship1",
        x: 20,
        y: 30,
        route: [
          { x: 20, y: 30 },
          { x: 75, y: 45 },
          { x: 85, y: 25 },
        ],
        currentRouteIndex: 0,
      },
      {
        id: "ship2",
        x: 70,
        y: 60,
        route: [
          { x: 70, y: 60 },
          { x: 15, y: 45 },
          { x: 30, y: 20 },
        ],
        currentRouteIndex: 0,
      },
      {
        id: "ship3",
        x: 45,
        y: 80,
        route: [
          { x: 45, y: 80 },
          { x: 80, y: 70 },
          { x: 60, y: 40 },
        ],
        currentRouteIndex: 0,
      },
    ];
    setShips(initialShips);

    // Animate ships along their routes
    const interval = setInterval(() => {
      setShips((prevShips) =>
        prevShips.map((ship) => {
          const nextIndex = (ship.currentRouteIndex + 1) % ship.route.length;
          const nextPosition = ship.route[nextIndex];
          
          return {
            ...ship,
            x: nextPosition.x,
            y: nextPosition.y,
            currentRouteIndex: nextIndex,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-card rounded-lg overflow-hidden maritime-shadow">
      {/* World map background with grid */}
      <div className="absolute inset-0 opacity-20">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.1"
                className="text-muted-foreground"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Simplified world continents */}
          <path
            d="M15,25 Q20,20 30,25 Q35,30 40,28 Q45,25 50,30 Q55,35 45,40 Q40,45 35,40 Q30,42 25,40 Q20,35 15,25 Z"
            fill="currentColor"
            className="text-muted opacity-30"
          />
          <path
            d="M60,15 Q70,10 80,15 Q85,20 82,30 Q78,35 75,32 Q70,35 65,30 Q62,25 60,15 Z"
            fill="currentColor"
            className="text-muted opacity-30"
          />
          <path
            d="M10,50 Q15,45 25,50 Q30,55 28,65 Q25,70 20,68 Q15,65 12,60 Q8,55 10,50 Z"
            fill="currentColor"
            className="text-muted opacity-30"
          />
        </svg>
      </div>

      {/* Shipping routes */}
      <svg className="absolute inset-0 w-full h-full">
        {ships.map((ship) => (
          <g key={`route-${ship.id}`}>
            {ship.route.map((point, index) => {
              const nextPoint = ship.route[(index + 1) % ship.route.length];
              return (
                <line
                  key={`line-${index}`}
                  x1={`${point.x}%`}
                  y1={`${point.y}%`}
                  x2={`${nextPoint.x}%`}
                  y2={`${nextPoint.y}%`}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="5 5"
                  className="text-primary opacity-60 animate-pulse"
                />
              );
            })}
          </g>
        ))}
      </svg>

      {/* Animated ships */}
      {ships.map((ship) => (
        <div
          key={ship.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 ship-float transition-all duration-[3000ms] ease-in-out"
          style={{
            left: `${ship.x}%`,
            top: `${ship.y}%`,
          }}
        >
          <div className="relative">
            {/* Ship icon */}
            <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center glow-effect">
              <div className="w-3 h-2 bg-primary-foreground rounded-xs"></div>
            </div>
            
            {/* Ship wake effect */}
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 opacity-40">
              <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      ))}

      {/* Major ports */}
      <div className="absolute top-[25%] left-[20%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-3 h-3 bg-gold-accent rounded-full wave-pulse"></div>
        <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
          Port Alpha
        </span>
      </div>
      
      <div className="absolute top-[45%] right-[25%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-3 h-3 bg-gold-accent rounded-full wave-pulse"></div>
        <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
          Port Beta
        </span>
      </div>
      
      <div className="absolute bottom-[30%] left-[70%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-3 h-3 bg-gold-accent rounded-full wave-pulse"></div>
        <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
          Port Gamma
        </span>
      </div>
    </div>
  );
};

export default GlobalMap;