"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();


  if (pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="bg-cyan-400 text-slate-900">
      <div className="max-w-11/12 mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            RMIT University
          </h2>
          <p className="text-sm text-cyan-50 leading-relaxed">
            A trusted platform for academic, administrative, and general
            university notices.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/about"
                className="text-cyan-50 hover:text-white transition"
              >
                About University
              </Link>
            </li>
            <li>
              <Link
                href="/all-notice"
                className="text-cyan-50 hover:text-white transition"
              >
                All Notices
              </Link>
            </li>
            <li>
              <Link
                href="/departments"
                className="text-cyan-50 hover:text-white transition"
              >
                Departments
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-cyan-50 hover:text-white transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
            Follow Us
          </h4>

          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Twitter"
              className="p-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white transition"
            >
              <FaTwitter className="text-lg" />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="p-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white transition"
            >
              <FaYoutube className="text-lg" />
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="p-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white transition"
            >
              <FaFacebookF className="text-lg" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cyan-300 py-5 text-center text-xs text-cyan-50">
        © {new Date().getFullYear()} RMIT University. All rights reserved.
      </div>
    </footer>
  );
}
