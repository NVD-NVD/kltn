import React, { useState } from "react";
import { getProductRecommendAsync } from "../../../../apis/product/getproductrecommend.api";
import { IProduct } from "../../../../bussiness/product";
import { ButtonSpinner } from "../../../../components/ButtonSpinner";
import CardProduct from "../../../../components/CardProduct";
import { AiOutlineSearch } from "react-icons/ai";

import "./style.scss";
import { removeVietnameseTones } from "../../../../utils/removeTiengViet";
import { notifyError } from "../../../../utils/notify";
interface Props {}

const OurProduct = (props: Props) => {
  const [list, setList] = useState<IProduct[]>([]);
  const [search, setSearch] = useState(``);
  const [pageSize, setPageSize] = useState(12);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  React.useEffect(() => {
    const getData = async () => {
      const result = await getProductRecommendAsync({
        size: pageSize,
        page: currentPage,
        search: search,
      });

      const { data } = result;
      setList(data.content);
      setTotalPage(data?.totalPages);
    };
    getData();
  }, []);

  React.useEffect(() => {
    if (pageSize < 0) {
      setPageSize(7);
      return;
    }
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
    const getData = async () => {
      const result = await getProductRecommendAsync({
        size: pageSize,
        page: currentPage,
        search: search,
      });
      console.log(result);
      const { data } = result;
      //console.log('getProductRecommendAsync', data);

      setList(data.content);
      setTotalPage(data?.totalPages);
    };
    getData();
  }, [currentPage, pageSize]);

  return (
    <section className="ftco-section">
      {/* <div className='container'>
				<div className='row justify-content-center mb-3 pb-3'>
					<div
						className='
							col-md-12
							heading-section
							text-center
							ftco-animate
						'
					>
						<span className='subheading'>Sách nổi bật</span>
						<h2 className='mb-4'>Danh mục</h2>
						<p>
						"Tất cả những gì con người làm, nghĩ hoặc trở thành được bảo tồn một cách kỳ diệu trên những trang sách". [Thomas Carlyle]
						</p>
					</div>
				</div>
			</div> */}
      <div className="container flex-column ">
        <div className="pagination">
          <div className="search-container">
            <AiOutlineSearch className="ic" />
            <input
              type="text"
              className="search"
              placeholder="Tìm kiếm..."
              onChange={(e: any) => {
                if (e.target.value !== "") {
                  let lst = list.filter((pro: any) =>
                    removeVietnameseTones(pro.title.toLowerCase()).includes(
                      e.target.value.toLowerCase()
                    )
                  );
                  setList([...lst]);
                } else {
                  getProductRecommendAsync({
                    size: pageSize,
                    page: currentPage,
                    search: search,
                  }).then((result) => {
                    const { data } = result;
                    setList(data.content);
                    setTotalPage(data?.totalPages);
                  });
                }
              }}
            />
          </div>
          <div className="pagi-wrapper">
            <div className="select-size">
              Size:
              <input
                type="number"
                value={pageSize}
                onKeyPress={(e: any) => {
                  if (e.key === "Enter") {
                    setPageSize(e.target.value);
                  }
                }}
                min={7}
                onChange={(e: any) => setPageSize(e.target.value)}
              />
            </div>
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
                if (currentPage < totalPage - 1)
                  setCurrentPage(currentPage + 1);
              }}
            >
              {">"}
            </div>
          </div>
        </div>

        {/* <section className='section'>
					<input
						type='text'
						className='input'
						onChange={e => setSearch(e.target.value)}
						placeholder='Search...'
					/>
				</section> */}
        <div className="row">
          {list.length > 0 && !isLoading ? (
            list.map((e: IProduct, i: number) => (
              <div className="col-md-6 col-lg-3 ftco-animate" key={i}>
                <CardProduct book={e} />
              </div>
            ))
          ) : (
            <div className="loading">
              <span className="spinner-border spinner-border-sm"></span>
              Loading...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurProduct;
