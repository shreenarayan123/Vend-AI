import React from 'react'
import Image from "next/image";
import Link from "next/link";
import YourWebsite from "../../app/assets/YourWebsite.png";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {}

const Hero = (props: Props) => {
  return (
    <section className="container py-24 md:py-32">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight flex flex-col">
                <div>
                  <span className="font-customer font-bold">
                    Be there for your
                  </span>
                </div>
                <div>
                  <span className="font-customer font-bold">Users, every</span>
                </div>
                <div>
                  <span className="font-step italic bg-blue-600 bg-clip-text text-transparent">
                    Step of the way
                  </span>
                </div>
              </div>
              <p className="text-xl text-muted-foreground">
                Transform website visitors into loyal customers with intelligent
                chatbots that understand, qualify, and convert.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                <Button
                  size="lg"
                  className=" bg-blue-600 hover:bg-blue-700 rounded-2xl text-white"
                >
                  <Zap className="mr-2" />
                  Try for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
                <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-blue-600 rounded"
                >
                  Book a Demo
                </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl border">
              <Image
                src={YourWebsite}
                alt="Vend AI interface"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 right-0 w-64 h-80 bg-white rounded-tl-xl shadow-lg p-4 m-4 border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold">
                    CE
                  </div>
                  <div>
                    <p className="font-medium">Vend AI Assistant</p>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-muted p-2 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">
                      Hi there! How can I help you today?
                    </p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                    <p className="text-sm">
                      I'm looking for pricing information.
                    </p>
                  </div>
                  <div className="bg-muted p-2 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-sm">
                      I'd be happy to help with that! We offer three plans:
                      Standard, Pro, and Ultimate. Would you like me to explain
                      each one?
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="w-full rounded-full border border-input bg-background px-4 py-2 text-sm"
                    />
                    <Button
                      size="icon"
                      className="absolute right-0 top-0 h-full rounded-full aspect-square"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}

export default Hero