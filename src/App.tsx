import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, ArrowRight, CheckCircle, Zap, Users, Globe, MessageSquare, BarChart2, ArrowUpRight } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);

  // Star background configuration
  const createStars = useCallback(() => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      const star = {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 2 + 1}px`,
        duration: `${Math.random() * 3 + 2}s`,
      };
      stars.push(star);
    }
    return stars;
  }, []);

  const [stars] = useState(createStars);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Scroll handler for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Features data
  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Messaging",
      description: "Intelligent conversations that adapt to each customer"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with customers across multiple platforms"
    },
    {
      icon: BarChart2,
      title: "Advanced Analytics",
      description: "Deep insights into customer engagement metrics"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless workflow integration for your team"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white relative overflow-hidden">
      {/* Star Background */}
      <div className="stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              '--duration': star.duration,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed w-full bg-[#0e0e0e]/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="flex items-center space-x-2 logo-hover"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-[#cb4953] to-[#efb443] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-2xl font-bold gradient-text">AiME</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['features', 'pricing', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="nav-link capitalize"
                >
                  {item}
                </button>
              ))}
              <button className="cta-button px-6 py-2 rounded-full">
                <span>Get Started</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0e0e0e]/95 border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['features', 'pricing', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 nav-link capitalize"
                >
                  {item}
                </button>
              ))}
              <button className="w-full mt-4 cta-button px-6 py-2 rounded-full">
                <span>Get Started</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center reveal">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transform Your Customer <br />
              <span className="gradient-text">Conversations</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Leverage AI-powered messaging to convert browsers into buyers with personalized, 
              scalable communication that grows your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <button className="cta-button px-8 py-4 rounded-full group">
                <span className="flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="px-8 py-4 rounded-full border border-gray-700 hover:bg-gray-800 transition-colors">
                Watch Demo
              </button>
            </div>
            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-[#cb4953]" size={20} />
                <span className="text-gray-300">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-[#cb4953]" size={20} />
                <span className="text-gray-300">14-day free trial</span>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div 
            className="mt-16 floating dashboard-preview reveal"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div className="relative mx-auto max-w-4xl">
              <div className="bg-[#0e0e0e]/50 backdrop-blur-xl rounded-2xl border border-gray-700 p-6 shadow-2xl">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 bg-gray-700/50 rounded-lg p-4">
                    <div className="h-48 bg-gradient-to-r from-[#cb4953]/20 to-[#efb443]/20 rounded-lg"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-700/50 rounded-lg p-4 h-20"></div>
                    <div className="bg-gray-700/50 rounded-lg p-4 h-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              Everything you need to scale
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Powerful features that help you convert, engage, and grow your customer base 
              through intelligent automation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="feature-card reveal"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <feature.icon className="text-[#cb4953] mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#cb4953] to-[#efb443] rounded-2xl p-8 md:p-16 text-center relative overflow-hidden reveal">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to transform your customer engagement?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses using Aime to grow their customer base 
                and increase conversions.
              </p>
              <button className="bg-white text-[#cb4953] px-8 py-4 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto group">
                <span className="font-semibold">Get Started Now</span>
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0e0e0e] text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <button 
                onClick={() => scrollToSection('hero')} 
                className="flex items-center space-x-2 logo-hover mb-4"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#cb4953] to-[#efb443] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-2xl font-bold gradient-text">AiME</span>
              </button>
              <p className="text-sm">
                Transforming customer engagement through intelligent automation.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition">Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white transition">Pricing</button></li>
                <li><button onClick={() => scrollToSection('integrations')} className="hover:text-white transition">Integrations</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition">About</button></li>
                <li><button onClick={() => scrollToSection('careers')} className="hover:text-white transition">Careers</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-white transition">Privacy Policy</button></li>
                <li><button className="hover:text-white transition">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Aime. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;