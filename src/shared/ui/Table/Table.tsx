import React from "react";
import cls from "./Table.module.scss";
import cnBind from "classnames/bind";

interface TableProps<T> {
  classes?: string[];
  head: string[];
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
              <th style={{ width: 10 }}></th>
              {head.map((el) => (
                <th className={cls.head} key={el}>{el}</th>
              ))}
              <th style={{ width: 10 }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((el: T) => (
              <tr>
                {Object.keys(data).map((p) => (
                  <td>{p}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
