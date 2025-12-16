import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Snowflake = ({ delay, duration, left }: { delay: number; duration: number; left: string }) => (
  <div
    className="absolute text-white/30 text-2xl pointer-events-none animate-snowfall"
    style={{
      left,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  >
    ❄
  </div>
);

const FlyingSanta = ({ delay, top }: { delay: number; top: string }) => (
  <div
    className="absolute text-4xl pointer-events-none animate-fly-santa z-20"
    style={{
      top,
      animationDelay: `${delay}s`,
    }}
  >
    🎅🛷
  </div>
);

const ChristmasLights = ({ count = 8 }: { count?: number }) => {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i;
        const color = colors[i % colors.length];
        
        return (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-lights"
            style={{
              background: color,
              boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
              left: `${50 + 48 * Math.cos((angle * Math.PI) / 180)}%`,
              top: `${50 + 48 * Math.sin((angle * Math.PI) / 180)}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        );
      })}
    </div>
  );
};

const Index = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const snowflakes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    left: `${Math.random() * 100}%`,
  }));

  const santas = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: i * 7,
    top: `${20 + Math.random() * 40}%`,
  }));

  const buttons = [
    { name: 'ОПЕРАТОР', icon: 'Headphones', url: 'https://t.me/operator' },
    { name: 'ЧАТ', icon: 'MessageCircle', url: 'https://t.me/chat' },
    { name: 'КАНАЛ', icon: 'Radio', url: 'https://t.me/channel' },
    { name: 'БОТ', icon: 'Bot', url: 'https://t.me/bot' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-cosmic-dark via-cosmic-dark to-[#0f1419] flex items-center justify-center p-4">
      {snowflakes.map((flake) => (
        <Snowflake
          key={flake.id}
          delay={flake.delay}
          duration={flake.duration}
          left={flake.left}
        />
      ))}

      {santas.map((santa) => (
        <FlyingSanta key={santa.id} delay={santa.delay} top={santa.top} />
      ))}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 2 + 's',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl w-full">
        <div
          className={`transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="mb-8 animate-float">
            <div className="inline-block relative">
              <h1 className="text-7xl md:text-8xl font-bold text-white mb-2 tracking-wider font-montserrat">
                COSMO
              </h1>
              <div className="absolute -top-4 -right-4 text-4xl animate-twinkle">✨</div>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-cosmic-ice to-cosmic-gold mx-auto rounded-full animate-glow" />
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cosmic-ice via-white to-cosmic-gold bg-clip-text text-transparent mt-2 font-montserrat">
              LAND
            </h2>
          </div>

          <p className="text-cosmic-ice/80 text-lg mb-12 font-roboto">
            Откройте двери в космический мир возможностей ❄️
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
            {buttons.map((btn, index) => (
              <a
                key={btn.name}
                href={btn.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-300 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="relative">
                  <ChristmasLights count={12} />
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-16 text-lg font-semibold bg-cosmic-dark/50 border-2 border-cosmic-ice/30 text-white hover:bg-cosmic-ice/20 hover:border-cosmic-ice hover:scale-105 hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] transition-all duration-300 backdrop-blur-sm font-roboto group relative z-10"
                  >
                    <Icon name={btn.icon as any} className="mr-2 group-hover:animate-pulse" size={24} />
                    {btn.name}
                  </Button>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 text-cosmic-gold/60 text-sm font-roboto animate-twinkle">
            🎄 С наступающим Новым Годом! 🎄
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
