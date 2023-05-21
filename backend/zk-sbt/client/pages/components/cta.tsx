import React from "react";

export default function CallToAction() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Interested in what we're building next</span>
          <span className="block">Or to build with us?</span>
          <span className="block text-indigo-600">Reach out to us today!</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          {/* <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
            >
              Get started
            </a>
          </div> */}
          <div className="ml-6 inline-flex rounded-md shadow">
            <a
              href="https://twitter.com/TheSpartanLabs"
              className="inline-flex items-center justify-center rounded-md border border-blue bg-white px-8 py-6 text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Follow Us!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}