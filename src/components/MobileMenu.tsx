"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-50 bg-navy"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-6 text-offwhite font-display text-2xl hover:opacity-60 transition-opacity"
            aria-label="Close menu"
          >
            &times;
          </button>

          {/* Nav links */}
          <nav className="flex flex-col items-center justify-center h-full gap-10">
            {siteConfig.navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-display text-4xl md:text-5xl italic text-offwhite tracking-wide hover:text-brass transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
