import type { FC } from "react";
import { Outlet } from "react-router";
import { Flex } from "@radix-ui/themes";

import Sidebar from "./sidebar";
import Topbar from "./topbar";

const Layout: FC = () => {
  return (
    <Flex className="flex min-h-screen bg-neutral-100 overflow-hidden">
      <Sidebar className="max-w-[300px]" />
      <main className="w-full flex-1 overflow-x-hidden overflow-y-auto p-8">
        <Topbar />
        <Outlet />
      </main>
    </Flex>
  );
};

export default Layout;
