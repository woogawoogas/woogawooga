"useclient";
import React, { useState } from "react";
import Image from "next/image";

import imageCompression from "browser-image-compression";

import test from "/public/test.png";

import { stylesImg } from "@/styles/Image.styles";
import DefaultHead from "@/utils/defaultHead";

export default function Test() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState("");

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const imageHandleCompress = async (e) => {
    let file = e.target.files[0];
    const options = {
      maxSizeMB: 0.7,
      maxWidthorHeight: 1000,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      setFile(compressedFile);
      const promise = imageCompression.getDataUrlFromFile(compressedFile);
      promise.then((result) => {
        setFileUrl(result);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <React.Fragment>
      {/* head 추가 */}
      <DefaultHead
        title="이미지"
        desrciption="테스트"
        seo="테스트"
        keyword="image"
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
        {/* 최적화 이미지 */}
        <div style={{ width: "50%", height: "100%" }}>
          <Image
            src={test}
            style={stylesImg}
            alt="A picture"
            loading="lazy"
            decoding="async"
          />
        </div>
        {/* 기본 nextimg */}
        <Image src="/test.png" width={300} height={300} alt="image" />
      </div>

      {/* 기본 파일 Input */}
      <div style={{ border: "5px solid pink" }}>
        <input type="file" name="image/*" onChange={handleFileInputChange} />
        {previewSource && (
          <Image src={previewSource} alt="Preview" width={100} height={100} />
        )}
      </div>

      {/* 압축 사용한 Input  */}
      <div style={{ border: "5px solid #5781d5" }}>
        <input type="file" accept="image/*" onChange={imageHandleCompress} />
        {fileUrl && (
          <Image src={fileUrl} alt="profile_img" width={100} height={100} />
        )}
      </div>
    </React.Fragment>
  );
}
