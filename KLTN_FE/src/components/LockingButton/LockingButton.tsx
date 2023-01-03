import React from "react";
import { HiLockClosed } from "react-icons/hi";
import { lockUserAsync } from "../../apis/user/lockUser";
import { HiBadgeCheck } from "react-icons/hi";

import { HiBan } from "react-icons/hi";
import { UnLockingButton } from "../UnLockingButton/UnLockingButton";
import { notifyError, notifySuccess } from "../../utils/notify";
export const LockingButton = ({
  id,
  lockFn,
  txt,
}: {
  id: string;
  lockFn: any;
  txt?: string;
}) => {
  const [isLocking, setIsLocking] = React.useState(false);
  const [isLocked, setIsLocked] = React.useState(false);
  return isLocked ? (
    <UnLockingButton txt={txt && "Bỏ khóa"} id={id} lockFn={lockFn} />
  ) : (
    <div
      className="lock"
      onClick={() => {
        lockFn(id).then((rs: any) => {
          setIsLocking(true);
          if (rs) {
            setTimeout(() => {
              setIsLocking(false);
              setIsLocked(true);
              notifySuccess("Khóa thành công");
            }, 2000);
          }
        });
      }}
    >
      {isLocking ? (
        "Locking...."
      ) : (
        <>
          <HiBadgeCheck className="ic" /> {txt}
        </>
      )}
    </div>
  );
};
