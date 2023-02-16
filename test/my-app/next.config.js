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
  reactStrictMode: true,
  images: {
    domains: ["s3.ap-northeast-2.amazonaws.com", "image.tmdb.org"],
    // 이미지 너비 목록을 지정 (화면의 전체 너비보다 작은 이미지)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 예상 장치 너비를 알고 있는 경우 breakingPoint 적용
    deviceSizes: [280, 320, 384, 414, 640, 768, 820, 1080, 1920],
    quality: 50,
    // 캐시로 60초간 이미지를 가지고 있는다.
    minimumCacheTTL: 40,
    formats: ["image/avif", "image/webp"],
    disableStaticImages: false,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
