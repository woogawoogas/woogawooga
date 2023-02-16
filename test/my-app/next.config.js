// /** @type {import('next').NextConfig} */
// const withImages = require("next-images")
// const withPlugins = require("next-compose-plugins")
// const withSharp = require("next-sharp")()

// module.exports = withPlugins([
//   [
//     withImages({
//       esModule: true,
//       webpack(config, options) {
//         config.module.rules.push({
//           test: /\.(jpe?g|png)$/i,
//           use: [
//             {
//               loader: "file-loader",
//               options: {
//                 publicPath: "/_next",
//                 name: "static/images/[name]-[hash].[ext]",
//               },
//             },
//             {
//               loader: "@ianwalter/imagemin-loader",
//               options: {
//                 plugins: [
//                   sharp().avif({
//                     quality: 50,
//                     speed: 5,
//                   }),
//                 ],
//               },
//             },
//           ],
//         })
//         return config
//       },
//     }),
//   ],
//   [
//     withSharp,
//     {
//       images: {
//         formats: ["avif", "webp", "png", "jpg"],
//         sizes: [320, 640, 960, 1200],
//         deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//         placeholder: true,
//         quality: 85,
//       },
//     },
//   ],
// ])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
     remotePatterns: [
      {
        protocol: 'https',
        hostname: "s3.ap-northeast-2.amazonaws.com","image.tmdb.org"
      }],
    images: {
      sizes: "250px",
    },
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 828, 1080, 1920],
    quality: 50,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
