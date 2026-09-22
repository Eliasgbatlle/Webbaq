/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estatico: el build genera out/ y Coolify lo sirve con nginx.
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // next/image no tiene servidor que optimice en un export estatico.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Sin headers(): las cabeceras de cache de /videos y /images las pone nginx.
}

export default nextConfig
