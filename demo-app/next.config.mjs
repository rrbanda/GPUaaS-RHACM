/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/GPUaaS-RHACM/demo' : '',
  assetPrefix: isProd ? '/GPUaaS-RHACM/demo/' : '',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/GPUaaS-RHACM/demo' : '',
  },
};

export default nextConfig;
