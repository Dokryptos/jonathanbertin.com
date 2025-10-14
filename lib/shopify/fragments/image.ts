const imageFragment = /* GraphQL */ `
  fragment image on Image {
    url
    altText
    width
    height
  }
`;

export default imageFragment;
export interface ImageFragment {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}
