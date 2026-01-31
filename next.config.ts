import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   reactCompiler: true,
   sassOptions: {
      prependData: `@use "@/styles/_mixins.scss" as *; @use "@/styles/_variables.scss" as *;`,
   },
};

export default nextConfig;
