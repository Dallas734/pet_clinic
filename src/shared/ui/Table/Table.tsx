import React, { useEffect, useState } from "react";
import cls from "./Table.module.scss";
import cnBind from "classnames/bind";
import TableColumn from "./TableColumn";

var sortMultidimensionalArrayFunc = <T extends Object>(
  inArr: Array<T>,
  inIndex: string,
  inOrderBy: string
) => {
  var arr: Array<T> = inArr.length > 0 && inArr !== undefined ? inArr : [];
  var index: string =
    inIndex.length > 1 && inIndex !== undefined ? inIndex : "";
  var orderBy = inOrderBy;

  const indexes = index.split(".");
  var len = indexes.length;

  if (process.env.NODE_ENV !== "production") {
    var classof = function classof(obj: Object) {
      return Object.prototype.toString.call(obj).slice(8, -1);
    };

    if (classof(arr) !== "Array") {
      throw new Error("First argument must be a array");
    }

    if (classof(index) !== "String") {
      throw new Error("Second argument must be a string");
    }
  }

  function asc(firstArray: Object, secondArray: Object) {
    var i = 0;
    while (i < len) {
      firstArray = firstArray[indexes[i] as keyof Object];
      secondArray = secondArray[indexes[i] as keyof Object];
      i++;
    }
    i--;
    console.log(firstArray);
    if (firstArray > secondArray) {
      return 1;
    } else if (firstArray < secondArray) {
      return -1;
    }

    return 0;
  }

  function desc(firstArray: Object, secondArray: Object) {
    var i = 0;
    while (i < len) {
      firstArray = firstArray[indexes[i] as keyof Object];
      secondArray = secondArray[indexes[i] as keyof Object];
      i++;
    }
    i--;
    if (firstArray < secondArray) {
      return 1;
    } else if (firstArray > secondArray) {
      return -1;
    }

    return 0;
  }

  switch (orderBy) {
    case "asc":
      return arr.sort(asc);
    case "desc":
      return arr.sort(desc);
    default:
      return arr;
  }
};

const getProperty = (
  indexes: String[],
  i: number,
  el: Object,
  arr: Object[]
) => {
  type P = keyof typeof el;
  var newProperty = el[indexes[i] as P];

  if (indexes[i + 1] !== undefined) {
    i++;
    getProperty(indexes, i, newProperty, arr);
  } else {
    arr[0] = newProperty;
  }
};

interface TableProps<T> {
  classes?: string[];
  head: TableColumn[];
  data?: Array<T>;
  setHead?: (arr: TableColumn[]) => void;
}

export const Table = <T extends Object>(props: TableProps<T>) => {
  const { classes = [], head = [], data = [], setHead = null } = props;
  const [viewData, setViewData] = useState<Array<T>>(data);
  const [activeId, setActiveId ] = useState<number>();
  const cn = cnBind.bind(cls);

  useEffect(() => {
    setViewData(data);
  }, [data]);

  const sortTableFunc = (id: string, sortMethod: string, index: number) => {
    let currentSortMethod = sortMethod;
    switch (sortMethod) {
      case "none":
        currentSortMethod = "none";
        break;
      case "default":
        currentSortMethod = "asc";
        break;
      case "asc":
        currentSortMethod = "desc";
        break;
      case "desc":
        currentSortMethod = "asc";
        break;
      default:
        currentSortMethod = "asc";
    }

    head.forEach((x) =>
      x.index === id ? (x.sortMethod = currentSortMethod) : x.sortMethod
    );
    if (setHead) setHead(head);

    let arrayForSort = [...viewData];
    // console.log(arrayForSort);
    setViewData(
      sortMultidimensionalArrayFunc(arrayForSort, id, currentSortMethod)
    );
  };

  classes.push("Table");

  return (
    <>
      <div className={cls.container}>
        <table
          className={cn(...classes.map((clsName) => cls[clsName] || clsName))}
        >
          <thead>
            <tr className={cls.fixed}>
              {head.map((el, index) => (
                <th
                  className={cls.sorting}
                  onClick={() => {
                    sortTableFunc(
                      head[index].index,
                      head[index].sortMethod,
                      index
                    );
                  }}
                  key={el.index}
                >
                  {el.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {viewData.map((el: T, index) => (
              <tr key={index} onClick={() => setActiveId(index)} className={activeId === index ? cls.active : ""}>
                {head.map((column) => {
                  const indexes = column.index.split(".");
                  let arr: Object[] = [];
                  getProperty(indexes, 0, el, arr);
                  return (
                    <td key={indexes[0]}>
                      <>{arr[0]}</>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
