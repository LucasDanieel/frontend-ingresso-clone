export type FilmsProps = {
  name: string;
  age: number | string;
  img: string;
  premiere: string | null;
  pre_venda: boolean;
};

export type moviesProps = {
  id: number;
  name: string;
  classification: string;
  gender: string;
  duration: string;
  premiereDate: string;
  trending: boolean;
  preSale: boolean;
  slug: string;
  publicIdPosterImage: string;
  publicIdBannerImage: string;
  posterImage: string;
  bannerImage: string;
};
