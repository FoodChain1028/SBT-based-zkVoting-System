import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import Link from "next/link";
import logo from "../../public/spartanlabs-logomark_black.svg"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

const Header = (props: { isConnected: boolean }) => (
  <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 mt-2">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://spartanlabs.studio/" className="flex items-center">
                <img src="https://raw.githubusercontent.com/SpartanLabsXyz/zk-sbt/1f240dad5ee29db4f29e2069eb79762e11f47955/client/public/spartanlabs-logomark_black.svg" className="mr-3 h-6 sm:h-9" alt="Spartan Labs Logo" />
            </a>
            <div className="flex items-center lg:order-3">
                <ul className="flex items-center gap-10 text-sm">
                                {props.isConnected && (
                <li>
                  <ConnectButton
                    chainStatus="none"
                    showBalance={{
                      smallScreen: false,
                      largeScreen: true,
                    }}
                  />
                </li>
              )}
               <li>
                <a target="_blank" href="https://github.com/SpartanLabsXyz/zk-sbt">
                  <span className="text-black transition hover:text-gray-500/75 mt-5 hover:cursor-pointer">
                    CODE
                  </span>
                </a>
              </li>

              <li>
                <a target="_blank" href="https://medium.com/@spartanlabs/the-construction-of-the-soul-part-3-soulbound-token-with-zk-snark-implementation-900d808b9e79">
                  <span className="text-black transition hover:text-gray-500/75 mt-5 hover:cursor-pointer">
                    ARTICLE
                  </span>
                </a>
              </li>

              {/* Twitter */}
              <li>
                <a target="_blank" href="https://twitter.com/TheSpartanLabs">
                  <span><FontAwesomeIcon icon={faTwitter} /></span>
                  <span className="text-black transition hover:text-gray-500/75 mt-5 hover:cursor-pointer pl-1">
                    TWITTER
                  </span>
                </a>
              </li>
            
              </ul>
                
            </div>
           
        </div>
    </nav>
  </header>
);

export default Header;