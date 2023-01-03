import { ModalLMS } from "../../components/Modal";
import { moneyFormater } from "../../utils/moneyFormater";

interface Props {
  cancel: Function;
  open: boolean;
  data: any;
}

const ModalOrderDetail = (props: Props) => {
  const { cancel, open, data } = props;
  return (
    <div>
      {props.open&&data ? (
        <ModalLMS title="Order Detail" withHeader={true} cancel={props.cancel}>
          {data?.map((item: any, i: number) => (
            <div className="card mb-3" key={i}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item?.book?.image_URLs?.[0]}
                    className="img-fluid rounded-start "
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item?.book?.name}</h5>
                    <p className="card-text">{`Quantity: ${item?.quantity}`}</p>
                    <p className="card-text">{`Price: ${moneyFormater(
                      item?.total * item?.quantity
                    )}`}</p>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ModalLMS>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ModalOrderDetail;
