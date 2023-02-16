import React from "react";
import Head from "next/head";

export default function DefaultHead({ title, description, seo, keyword }) {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="author" content="jangho" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="Keywords" content={keyword || ""} />

        {/* <--Naver, 카카오톡 미리보기-->  */}
        <meta property="og:title" content="공유 제목" />
        <meta property="og:description" content="공유 설명" />
        <meta property="og:url" content="페이지 URL" />
        <meta property="og:image" content="이미지 URL" />
        <meta property="og:type" content="웹페이지 타입(blog, website 등)" />

        {/* <--twitter 공유-->  */}
        <meta name="twitter:title" content="공유 제목" />
        <meta name="twitter:description" content="공유 설명" />
        <meta name="twitter:image" content="이미지 URL" />
        <meta name="twitter:card" content="요약 이미지" />

        {/* <--iOS-->  */}
        <meta property="al:ios:url" content=" ios 앱 URL" />
        <meta property="al:ios:app_store_id" content="ios 앱스토어 ID" />
        <meta property="al:ios:app_name" content="ios 앱 이름" />

        {/* <--Android--> */}
        <meta property="al:android:url" content="안드로이드 앱 URL" />
        <meta property="al:android:app_name" content="안드로이드 앱 이름" />
        <meta property="al:android:package" content="안드로이드 패키지 이름" />
        <meta property="al:web:url" content="안드로이드 앱 URL" />
      </Head>

      <h1 id="seo">{seo || title}</h1>
    </React.Fragment>
  );
}
