import React from "react";
import { HiLockClosed } from "react-icons/hi";
import { lockUserAsync } from "../../apis/user/lockUser";
import { HiBadgeCheck } from "react-icons/hi";
import { LockingButton } from "../LockingButton/LockingButton";
import { notifyError, notifySuccess } from "../../utils/notify";
import { HiBan } from "react-icons/hi";

export const UnLockingButton = ({
  id,
  lockFn,
  txt,
}: {
  id: string;
  lockFn: any;
  txt?: any;
}) => {
  const [isUnLocking, setIsUnLocking] = React.useState(false);
  const [isUnLocked, setIsUnLocked] = React.useState(false);
  return isUnLocked ? (
    <LockingButton txt={txt && "Khóa"} id={id} lockFn={lockFn} />
  ) : (
    <div
      className="unlock"
      onClick={() => {
        lockFn(id).then((rs: any) => {
          setIsUnLocking(true);
          if (rs) {
            setTimeout(() => {
              setIsUnLocking(false);
              setIsUnLocked(true);
              notifySuccess("Mở khóa thành công");
            }, 2000);
          }
        });
      }}
    >
      {isUnLocking ? (
        "Unlocking...."
      ) : (
        <>
          <HiBan className="ic" />
          {txt}
        </>
      )}
    </div>
  );
};
