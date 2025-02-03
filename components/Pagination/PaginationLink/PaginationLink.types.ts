export type Direction = "previous" | "next";

export type PaginationLinkProps = {
  page: number;
  isDisabled: boolean;
  direction: Direction;
  createUrl: (page: number) => string;
};
