import React from 'react'
import { Button } from '../ui/button'

type Props = {}

const CTA = (props: Props) => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-teal-500">
    <div className="container text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-step italic">
        Ready to Transform Your Customer Engagement?
      </h2>
      <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
        Join thousands of businesses already using Vend AI to connect with their customers.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" variant="default" className="bg-white text-blue-600 hover:bg-white/90">
          Try for Free
        </Button>
        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
          Book a Demo
        </Button>
      </div>
    </div>
  </section>
  )
}

export default CTA