export const moneyFormater = (money: number) => {
  if (!money) money = 0;
  return money.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};
export const moneyFormaterDong = (money: number) => {
  if (!money) money = 0;
  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };
  const formated = new Intl.NumberFormat("vi-VN", config).format(money);
  return formated;
};
