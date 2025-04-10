"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../app/assets/logo.png";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Pricing from "@/components/pricing";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b ">
        <div
          className={` px-16 flex h-16 items-center w-full justify-between ${
            isScrolled
              ? "backdrop-blur supports-[backdrop-filter]:bg-background/60 "
              : "bg-customblue "
          }`}
        >
          {" "}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Image src={Logo} alt="Logo" width={36} height={36} />{" "}
            </div>{" "}
            <span className="text-xl font-bold">Vend AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#dashboard"
              className="text-sm font-medium hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Try for Free</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-customblue">
        <Hero />
        <Features />
        <section id="dashboard" className="py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful Analytics Dashboard
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Track performance, measure engagement, and optimize your
                conversions with real-time data.
              </p>
            </div>
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl border">
              <Image
                src="/placeholder.svg?height=500&width=1200"
                alt="Vend AI dashboard"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                >
                  See the Dashboard in Action
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <Pricing />

        {/* CTA Section */}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
