import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import { getListByCategory } from "../../apis/category/listByCategory";
import { getListCategoryName } from "../../apis/category/listCategoryName";
import { getProductRecommendAsync } from "../../apis/product/getproductrecommend.api";
import HeroCommon from "../../components/HeroCommon";
import Pagination from "../../components/Pagination";
import ShopProduct from "./components/ShopProduct";
import "./Shop.style.scss";

const ShopPage = () => {
  const { category_id }: { category_id: string } = useParams();

  const [list, setList] = useState<any>([]);
  const [listCategory, setListCategory] = useState<any>([]);
  const [categoryActive, setCategoryActive] = React.useState<any>();
  React.useEffect(() => {
    getListCategoryName().then((rs: any) => {
      setListCategory(rs?.data);
      setCategoryActive(category_id);
    });
  }, []);
  const getByCategory = async (id: string) => {
    const rs = await getListByCategory(id);
    if (rs) {
      const { data } = rs;
      setList(data?.productsOfCategory);
    }
  };
  React.useEffect(() => {
    getByCategory(categoryActive);
  }, [categoryActive]);
  console.log(list);

  return (
    <main>
      <HeroCommon />
      <section className="ftco-section">
        <div className="container wrapper">
          <div className="filter">
            Danh mục :
            {listCategory?.map((cat: any, key: any) => {
              return (
                <div
                  className={
                    cat.id === categoryActive ? "option active" : "option"
                  }
                  key={key}
                  onClick={() => setCategoryActive(cat.id)}
                >
                  {cat.title}
                </div>
              );
            })}
          </div>
          <ShopProduct data={list} />
          {/* <Pagination handleChangePage={(page: number) => getDataAll(page)} /> */}
        </div>
      </section>
    </main>
  );
};

export default ShopPage;
