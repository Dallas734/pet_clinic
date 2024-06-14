import { SideNavBar } from "@/widgets/SideNavBar";
import HistoryNav from "@/widgets/HistoryNav/ui/HistoryNav";
import { memo } from "react";
import cls from "./Page.module.scss";
import { Outlet } from "react-router";

export const Page = memo(() => {
  return (
    <div className={cls.page}>
      <SideNavBar />
      <div className={cls.pageZone}>
        <HistoryNav />
        <main className={cls.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
});
