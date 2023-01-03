import React, { useState } from "react";
import { getProductRecommendAsync } from "../../../../apis/product/getproductrecommend.api";
import CardProduct from "../../../../components/CardProduct";

const RelativeProduct = () => {
  const [listRecommendProduct, setListReccommendProduct] = useState<any>([]);

  React.useEffect(() => {
    (async () => {
      const result = await getProductRecommendAsync({ size: 8 });
      const { data } = result;
      if (result.statusCode === 200) setListReccommendProduct(data.content);
      console.log(result);
    })();
  }, []);
  return (
    <div>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-3 pb-3">
            <div className="col-md-12 heading-section text-center ftco-animate">
              <span className="subheading">Sản phẩm</span>
              <h2 className="mb-4">Sản phâm khác</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {listRecommendProduct.length > 0 && listRecommendProduct.map((e: any, i: number) => (
              <div className="col-md-6 col-lg-3 ftco-animate" key={i}>
                <CardProduct book={e} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RelativeProduct;
