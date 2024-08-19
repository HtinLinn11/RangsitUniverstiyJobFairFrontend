import { useState } from "react";
import { Drawer } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
interface Props {
  bgColor: string;
  aciveBgColor: string;
  activeFontColor: string;
  menuItems: Array<{ title: string; subPageUrl: string }>;
}

const SideBar = ({
  menuItems,
  bgColor,
  aciveBgColor,
  activeFontColor,
}: Props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleToMain = () => {
    navigate("/");
  };
  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <div
      className="w-full z-40 fixed top-0 m-0"
      style={{ backgroundColor: bgColor }}
    >
      <div className="p-4 lg:pt-3 pt-8 ps-11 mt-0 flex w-full items-center gap-10">
        <MenuOutlined
          style={{ fontSize: "1.5em", display: "inline" }}
          onClick={showDrawer}
        />
        <div className="hidden md:block pb-3">
          <span className="cursor-pointer" onClick={handleToMain}>
            <img src="/logo.png" alt="RSU Logo" />
          </span>
        </div>
        {/* login user icon */}
        <button
          onClick={handleLoginClick}
          className="bg-white rounded-full size-8 me-0 absolute top-7 right-32 hidden md:block"
        >
          <UserOutlined className="text-xl" />
        </button>
        <Drawer
          title={
            <span className="cursor-pointer" onClick={handleToMain}>
              <img
                src="/logo.png"
                alt="RSU Logo"
                className="w-8 absolute top-2 right-6"
              />
            </span>
          }
          placement="left"
          closable={true}
          onClose={onClose}
          open={open}
          key="left"
          style={{ backgroundColor: bgColor }}
        >
          <MenuItem
            handleClose={onClose}
            menuItems={menuItems}
            activeBgColor={aciveBgColor}
            activeFontColor={activeFontColor}
          />
        </Drawer>
      </div>
    </div>
  );
};

export default SideBar;
