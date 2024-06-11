import React from "react";
import cls from "./Table.module.scss";
import cnBind from "classnames/bind";
import TableColumn from "./TableColumn";

interface TableProps<T> {
  classes?: string[];
  head: TableColumn[];
  data?: Array<T>;
}

export const Table = <T extends Object>(props: TableProps<T>) => {
  const { classes = [], head = [], data = [] } = props;
  const cn = cnBind.bind(cls);

  classes.push("Table");

  return (
    <>
      <div className={cls.container}>
        <table
          className={cn(...classes.map((clsName) => cls[clsName] || clsName))}
        >
          <thead>
            <tr>
              {/* <th style={{ width: 10 }}></th> */}
              {head.map((el) => (
                <th className={cls.head} key={el.index}>
                  {el.name}
                </th>
              ))}
              {/* <th style={{ width: 10 }}></th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((el: T, index) => (
              <tr key={index}>
                {
                  head.map((column) => {
                    type P = keyof typeof el;
                    const property = el[column.index as P];
                    return (
                      <td key={column.index}>
                        <>{property}</>
                      </td>
                    );
                  })
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
