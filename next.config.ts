import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // 禁用 Next.js 热重载，由 nodemon 处理重编译
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/classroom",
        destination:
          "https://us06web.zoom.us/j/4805595450?pwd=XTAPk0zNuhEBDXUhMKpWTmrKLhB7pc.1",
        permanent: true,
      },
      {
        source: "/Classroom",
        destination:
          "https://us06web.zoom.us/j/4805595450?pwd=XTAPk0zNuhEBDXUhMKpWTmrKLhB7pc.1",
        permanent: true,
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // 禁用 webpack 的热模块替换
      config.watchOptions = {
        ignored: ['**/*'], // 忽略所有文件变化
      };
    }
    return config;
  },
  eslint: {
    // 构建时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG:true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
