import test from "/public/test.png";
import { StyledImage } from "@/styles/Image.styles";
import DefaultHead from "@/utils/defaultHead";

export default function Test() {
  return (
    <>
      {/* <div style={{position: "relative", width: "300px", aspectRatio: "4/3"}}> */}
      {/* 로컬 이미지 사용 시 import 후 적용 하며 width / height 적용 없이 자동 결정 누적 레이아웃 이동을height 방지*/}
      <DefaultHead title="이미지" content="테스트" seo="테스트" />
      <StyledImage
        src={test}
        alt="이미지 에러"
        width={800}
        height={500}
        layout="responsive"
        sizes="(max-width: 600px) 100px, (min-width: 601px) 200px"
      />
      {/* 원격 이미지 사용 시 width height blurDataURL 속성 필요  */}

      <input
        type="file"
        id="file-upload"
        // onChange={handleFileChange}
        accept="image/*"
      />
    </>
  );
}
