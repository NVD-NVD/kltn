import React, { useState } from "react";
import { IProduct } from "../../../../bussiness/product";
import CardProduct from "../../../../components/CardProduct";
import "./style.scss";

interface IProps {
  data: IProduct[];
}

const ShopProduct = ({ data }: IProps) => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [totalPage, setTotalPage] = React.useState<number>(0);
  const [dataShown, setDataShown] = React.useState<any>();

  // const pageSize = 7;
  // React.useEffect(() => {
  //   setTotalPage(Math.ceil(Number(data?.length) / pageSize));
  //   setCurrentPage(1);
  // }, []);
  // React.useEffect(() => {
  //   setDataShown(
  //     data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  //   );
  // }, [currentPage, totalPage]);
  return (
    <div className="row">
      {data?.length > 0
        ? data
            // .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
            ?.sort((a: any, b: any) => b.enable - a.enable)
            .map((e: any, i: any) => (
              <div className="col-md-6 col-lg-3 ftco-animate" key={i}>
                <CardProduct book={e} />
              </div>
            ))
        : "Hiện không có sản phẩm nào trong danh mục này"}

      {/* <div className="pagination">
        <div
          className="btn-change"
          onClick={() => {
            if (currentPage > 0) setCurrentPage(currentPage - 1);
          }}
        >
          {"<"}
        </div>
        {Array.from(Array(totalPage).keys()).map((item, key) => {
          return (
            <div
              className={currentPage === item ? "num active" : "num"}
              key={key}
              onClick={() => setCurrentPage(item)}
            >
              {item + 1}
            </div>
          );
        })}

        <div
          className="btn-change"
          onClick={() => {
            if (currentPage < totalPage - 1) setCurrentPage(currentPage + 1);
          }}
        >
          {">"}
        </div>
      </div> */}
    </div>
  );
};

export default ShopProduct;
