export type OldFilmsProps = {
  name: string;
  age: number | string;
  img: string;
  premiere: string | null;
};

export type NewFilmsProps = OldFilmsProps & {
  description?: string;
  pre_venda?: boolean;
};
