import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-slate-100">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-customer font-bold mb-4 text-black">
          Ready to Transform Your Customer Engagement?
        </h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
          Join thousands of businesses already using Vend AI to connect with
          their customers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className=" bg-black rounded-2xl text-white">
              <Zap className="mr-2" />
              Try for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
