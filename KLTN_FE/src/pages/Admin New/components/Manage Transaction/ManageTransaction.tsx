import React from "react";
import { AiFillDelete, AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./ManageTransaction.scss";
import { notifySuccess } from "../../../../utils/notify";
import { getTransactionPaging } from "../../../../apis/transactions/getTransactionsPaging.api";
import { DetailTransaction } from "../popups/Detail Transaction/DetailTransaction";
import { moneyFormaterDong } from "../../../../utils/moneyFormater";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const ManageTransaction = () => {
  const [transactions, setTransactions] = React.useState<Array<any>>([]);
  const [listRevenue, setListRevenue] = React.useState<Array<any>>([]);
  const [labels, setLabels] = React.useState<Array<any>>([]);
  const [transactionsAll, setTransactionsAll] = React.useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalPage, setTotalPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTrans, setActiveTrans] = React.useState<any>();
  const [txt, setTxt] = React.useState<any>("");
  const [isShowDetail, setIsShowDetail] = React.useState<any>(false);
  const pageSize = 15;
  React.useEffect(() => {
    getTransactionPaging().then((rs: any) => {
      if (rs && rs?.data) {
        setTransactionsAll(rs?.data);
      }
    });
  }, []);
  React.useEffect(() => {
    let tmp = transactionsAll;
    tmp.sort((a: any, b: any) => {
      return (
        Number(Date.parse(formatDateCustom(b.createdOn))) -
        Number(Date.parse(formatDateCustom(a.createdOn)))
      );
    });
    setTransactions(tmp);
  }, [transactionsAll]);
  React.useEffect(() => {
    let tt = 0;
    for (let i = 0; i < transactions.length; i++) {
      tt += Number(transactions[i].amount) / 100;
    }
    setTotal(tt);
    let lbs = transactions.map((tr: any) =>
      new Date(formatDateCustom(tr.createdOn)).getDate()
    );
    let arr1 = [];
    for (let i = 0; i < lbs.length; i++) {
      let isContained = false;
      for (let j = 0; j < arr1.length; j++) {
        if (lbs[i] === arr1[j]) {
          isContained = true;
        }
      }
      !isContained ? arr1.push(lbs[i]) : null;
    }
    console.log("arr1", arr1);
    arr1 = arr1.sort((a, b) => a - b);
    let arr2 = [];
    for (let k = 0; k < arr1.length; k++) {
      let val = 0;
      transactions?.map((tr: any) => {
        Number(new Date(formatDateCustom(tr?.createdOn)).getDate()) ===
        Number(arr1[k])
          ? (val += Number(tr?.amount) / 100)
          : null;
      });
      arr2.push(val);
    }
    console.log("arr2", arr2);
    setLabels(arr1);
    setListRevenue(arr2);
  }, [transactions]);
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: listRevenue,
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Bi???u ????? doanh thu " + txt,
      },
    },
  };

  return (
    <div className="manage-trans-container">
      {isShowDetail && (
        <DetailTransaction id={activeTrans} setVisibility={setIsShowDetail} />
      )}

      <div className="title-wrapper">
        <div className="title">Qu???n L?? ????n H??ng </div>
      </div>
      <div className="top-action">
        {/* <div className="search-container">
          <AiOutlineSearch className="ic" />
          <input type="text" className="search" placeholder="T??m ki???m" />
        </div> */}
        {/* <div className="btns">
          <div className="delete-order" onClick={() => {}}>
            <AiOutlineUserAdd /> X??a ????n h??ng
          </div>
        </div> */}
        <div className="btns" id="all">
          <div
            className="btn"
            onClick={() => {
              setTransactions(transactionsAll);
              setTxt("t???ng qu??t");
            }}
          >
            T???t c???
          </div>
          <div
            className="btn day"
            onClick={() => {
              var today = new Date();
              let temp = transactionsAll;
              let temp2 = temp.filter((trans: any) => {
                return (
                  new Date(formatDateCustom(trans.createdOn)).getDate() ===
                  today.getDate()
                );
              });
              setTransactions(temp2);
              setTxt("trong H??m nay");
            }}
          >
            H??m nay
          </div>
          <div
            className="btn week"
            onClick={() => {
              var today = new Date();
              let temp = transactionsAll;
              let temp2 = temp.filter((trans: any) => {
                return (
                  new Date(formatDateCustom(trans.createdOn)).getDate() <=
                    today.getDate() &&
                  new Date(formatDateCustom(trans.createdOn)).getDate() >=
                    today.getDate() - today.getDay()
                );
              });
              setTransactions(temp2);
              setTxt("trong Tu???n n??y ");
            }}
          >
            Tu???n n??y
          </div>
          {/* <div className="btn half-month">15 Ng??y</div> */}
          <div
            className="btn month"
            onClick={() => {
              var today = new Date();
              let temp = transactionsAll;
              let temp2 = temp.filter((trans: any) => {
                return (
                  new Date(formatDateCustom(trans.createdOn)).getMonth() ===
                  today.getMonth()
                );
              });
              setTransactions(temp2);
              setTxt("trong Th??ng n??y ");
            }}
          >
            1 Th??ng
          </div>
        </div>
      </div>
      <div className="total">
        <div className="money">T???ng ti???n: {moneyFormaterDong(total)}</div>
        <div className="quans"> {transactions.length} giao d???ch</div>
      </div>
      <div className="chart">
        <Line options={options} data={data} />
      </div>
      <div className="table-row-wrapper">
        <div className={"table-row table-head"}>
          <div className="stt">#</div>
          <div className="id">ID</div>
          <div className="date">Ng??y</div>
          {/* <div className="cardType">Lo???i th???</div>
          <div className="bankCode">M?? ng??n h??ng </div> */}
          <div className="price">T???ng ti???n</div>
        </div>
        {transactions?.length > 0 && !isLoading ? (
          transactions?.map((trans, key) => {
            return (
              <div
                className={"table-row"}
                onClick={() => {
                  setIsShowDetail(true);
                  setActiveTrans(trans.id);
                }}
                key={key}
              >
                <div className="stt">{currentPage * pageSize + key + 1}</div>
                <div className="id">{trans?.id}</div>
                <div className="date">{trans?.createdOn}</div>
                {/* <div className="cardType">{trans?.cardType}</div>
                <div className="bankCode">{trans?.bankCode}</div> */}
                <div className="price">
                  {moneyFormaterDong(Number(trans?.amount) / 100)}
                </div>
              </div>
            );
          })
        ) : (
          <div className="loading">
            <span className="spinner-border spinner-border-sm"></span>
            Loading...
          </div>
        )}
      </div>
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

export const formatDateCustom = (str: string) => {
  let a = str.replace(/\s+/g, "T").concat("Z").toString();
  let a1 = a.split("T");
  let [d, m, y] = a1[0].split("-");
  let newdate = [y, m, d].join("-");
  let b = newdate.concat("T").concat(a1[1]);
  return b;
};
