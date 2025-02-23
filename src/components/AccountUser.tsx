import React from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface AccountMenuProps {
  userData: {
    image?: string;
    name?: string;
  };
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ userData, visible }) => {
  if (!visible) return null;

  return (
    <div className="dark:bg-black bg-themeLight w-56 absolute top-14 right-0 py-5 flex-col border-2 dark:border-gray-800 border-white flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <Image
            className="w-8 rounded-md"
            src={userData?.image || "/images/user.png"}
            alt="Image_user"
            width={32}
            height={32}
          />
          <p className="dark:text-white text-themeDark text-sm group-hover/item:underline">
            {userData?.name || ""}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <button
          onClick={() => signOut()}
          className="px-3 text-center dark:text-white text-themeDark text-sm hover:underline"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default AccountMenu;
