import React from "react";
import {
  FigurePagination,
  NumberPaginations,
  ResultPaginations,
  ListPagination,
  InformL,
} from "./style";

export default function Paginations({
  img,
  limit,
  total,
  offset,
  setOffeset,
  children,
}) {
  //  SEMPRE ADICIONAR VALOR IMPARTAR NO TOTAL DA PAGINAÇÃO
  const MAX_ITEMS = 9;
  const MAX_LEFT = (MAX_ITEMS - 1) / 2;
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const firts = Math.max(current - MAX_LEFT, 1);

  return (
    <React.Fragment>
      <FigurePagination>{children}</FigurePagination>
      <NumberPaginations>
        <ResultPaginations>
          {Array.from({ length: MAX_ITEMS })
            .map((_, index) => index + firts)
            .map((page) => (
              <ListPagination>
                <InformL onClick={() => setOffeset((page - 1) * limit)}>
                  {page}
                </InformL>
              </ListPagination>
            ))}
        </ResultPaginations>
      </NumberPaginations>
    </React.Fragment>
  );
}
