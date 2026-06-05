"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Globe, ShoppingCart, Search, Target, RefreshCw, Server } from "lucide-react";
import { services } from "@/lib/services";

const serviceIcons: Record<string, React.ElementType> = {
  Globe,
  ShoppingCart,
  Search,
  Target,
  RefreshCw,
  Server,
};

const homeNavLinks = [
  { name: "Por qué WebBAQ", href: "#features" },
  { name: "Sectores", href: "#sectors" },
  { name: "Planes", href: "#pricing" },
  { name: "Cómo funciona", href: "#how-it-works" },
  { name: "FAQ", href: "#faq" },
];

function getLinkStyle(isActive: boolean, isScrolled: boolean): string {
  if (isActive) return "text-emerald-400 cursor-default pointer-events-none";
  return isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white";
}

function getUnderlineStyle(isActive: boolean, isScrolled: boolean): string {
  const baseWidth = isActive ? "w-full" : "w-0 group-hover:w-full";
  const baseColor = isScrolled ? "bg-emerald-500" : "bg-emerald-400";
  if (isActive) return `w-full bg-emerald-400`;
  return `${baseWidth} ${baseColor}`;
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isServicePage = pathname.startsWith("/servicios/");
  const isContactPage = pathname === "/contacto";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Bloquear scroll del body cuando el menú mobile está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const serviceLinks = services.map((s) => ({
    name: s.shortTitle,
    href: `/servicios/${s.slug}`,
    icon: serviceIcons[s.icon] || Globe,
    description: s.shortDescription,
  }));

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${isScrolled
        ? "top-4 left-4 right-4"
        : "top-0 left-0 right-0"
        }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${isScrolled || isMobileMenuOpen
          ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
          : "bg-transparent max-w-[1400px]"
          }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${isScrolled ? "h-14" : "h-20"
            }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className={`font-display tracking-tight transition-all duration-500 ${isScrolled ? "text-xl text-foreground" : "text-2xl text-white"}`}>
              WebBAQ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Inicio Link */}
            <Link
              href="/"
              className={`text-sm transition-colors duration-300 relative group ${getLinkStyle(pathname === "/", isScrolled)}`}
            >
              Inicio
              <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${getUnderlineStyle(pathname === "/", isScrolled)}`} />
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`flex items-center gap-1 text-sm transition-colors duration-300 relative group ${getLinkStyle(isServicePage, isScrolled)}`}
              >
                Servicios
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
                <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${getUnderlineStyle(isServicePage, isScrolled)}`} />
              </button>

              {isServicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                  <div className="bg-background/95 backdrop-blur-xl border border-foreground/10 rounded-xl shadow-2xl py-2 min-w-[320px]">
                    {serviceLinks.map((link) => {
                      const isCurrentService = link.href === pathname;
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={isCurrentService ? "#" : link.href}
                          onClick={() => {
                            if (!isCurrentService) setIsServicesOpen(false);
                          }}
                          className={`flex items-start gap-3 px-5 py-3 text-sm transition-colors ${isCurrentService
                            ? "text-emerald-400 cursor-default pointer-events-none"
                            : "text-foreground/70 hover:text-emerald-400 hover:bg-emerald-500/5"
                            }`}
                        >
                          <Icon className="w-5 h-5 mt-0.5 shrink-0" />
                          <div>
                            <span className="block font-medium">{link.name}</span>
                            {" "}
                            <span className="block text-xs text-muted-foreground/60 mt-0.5">{link.description}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Contacto Link */}
            <Link
              href="/contacto"
              className={`text-sm transition-colors duration-300 relative group ${getLinkStyle(isContactPage, isScrolled)}`}
            >
              Contacto
              <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${getUnderlineStyle(isContactPage, isScrolled)}`} />
            </Link>

            {/* Homepage section links — solo en homepage */}
            {isHomePage && homeNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors duration-300 relative group ${isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-emerald-500" : "bg-emerald-400"}`} />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          {!isContactPage && (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/contacto">
                <Button
                  size="sm"
                  className={`rounded-full transition-all duration-500 ${isScrolled
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white px-4 h-8 text-xs"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white px-6"
                    }`}
                >
                  Quiero mi web
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-500 ${isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${isMobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8 overflow-y-auto">
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            {/* Inicio — siempre visible en mobile */}
            <Link
              href="/"
              onClick={() => {
                if (pathname !== "/") setIsMobileMenuOpen(false);
              }}
              className={`text-4xl font-display transition-all duration-500 ${pathname === "/"
                ? "text-emerald-400 cursor-default pointer-events-none"
                : "text-foreground hover:text-emerald-400"
                } ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Inicio
            </Link>

            {/* Services in mobile */}
            <div className={`transition-all duration-500 ${isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">Servicios</p>
              <div className="flex flex-col gap-2">
                {serviceLinks.map((link) => {
                  const isCurrentService = link.href === pathname;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={isCurrentService ? "#" : link.href}
                      onClick={() => {
                        if (!isCurrentService) setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 text-xl font-display transition-colors ${isCurrentService
                        ? "text-emerald-400 cursor-default pointer-events-none"
                        : "text-white/80 hover:text-emerald-400"
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Contacto en mobile */}
            <Link
              href="/contacto"
              onClick={() => {
                if (pathname !== "/contacto") setIsMobileMenuOpen(false);
              }}
              className={`text-4xl font-display transition-all duration-500 ${isContactPage
                ? "text-emerald-400 cursor-default pointer-events-none"
                : "text-foreground hover:text-emerald-400"
                } ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Contacto
            </Link>

            {isHomePage && homeNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-4xl font-display text-foreground hover:text-emerald-400 transition-all duration-500 ${isMobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Bottom CTAs */}
          {!isContactPage && (
            <div className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
              }`}
            >
              <Link href="/contacto" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-full h-14 text-base"
                >
                  Quiero mi web
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
