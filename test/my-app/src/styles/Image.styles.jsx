import styled from "styled-components";
import Image from "next/image";

export const StyledImage = styled(Image)`
  max-inline-size: 100%;
  block-size: auto;
  object-fit: contain;
  object-position: top center;
  aspect-ratio: ${(props) => props.aspectRatio || ""};
`;
