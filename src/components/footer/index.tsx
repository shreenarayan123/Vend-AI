import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from "../../app/assets/logo.png";

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="relative">
                            <Image src={Logo} alt="Logo" width={36} height={36} />{" "}
                          </div>{" "}
              <span className="text-xl font-bold">Vend AI</span>
            </div>
            <div className="flex gap-8">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vend AI. All rights reserved.
          </div>
        </div>
      </footer>
  )
}

export default Footer