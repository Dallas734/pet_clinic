import { SideNavBar } from "@/widgets/SideNavBar";
import HistoryNav from "@/widgets/HistoryNav/ui/HistoryNav";
import { memo, ReactNode } from "react";
import cls from "./Page.module.scss";

interface PageProps {
  children: ReactNode;
  id: string;
}

export const Page = memo((props: PageProps) => {
  const { children, id } = props;
  return (
    <main id={id} className={cls.page}>
      <SideNavBar />
      <div className={cls.historyBar}>
        <div className={cls.hh}>
          <HistoryNav />
        </div>
        <div className={cls.content}>{children}</div>
      </div>
    </main>
  );
});
