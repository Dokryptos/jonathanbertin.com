export interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export default interface Home {
  _id: string;
  title: string;
  thumbnail: SanityImage;
}
