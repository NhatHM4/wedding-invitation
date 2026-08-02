import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['wedding-nhathm.com'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@supabase/supabase-js'],
  },
};

export default nextConfig;
