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

  function asc(firstArray: T, secondArray: T) {
    if (firstArray[index as keyof T] > secondArray[index as keyof T]) {
      return 1;
    } else if (firstArray[index as keyof T] < secondArray[index as keyof T]) {
      return -1;
    }

    return 0;
  }

  function desc(firstArray: T, secondArray: T) {
    if (firstArray[index as keyof T] < secondArray[index as keyof T]) {
      return 1;
    } else if (firstArray[index as keyof T] > secondArray[index as keyof T]) {
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

const getProperty = (indexes: String[], i: number, el: Object) => {
  type P = keyof typeof el;
  let newProperty;
  //console.log(Object.getPrototypeOf(el));
  if (Object.getPrototypeOf(el) !== String) {
    newProperty = el[indexes[i] as P];
    // console.log(newProperty);
    if (indexes[i + 1] !== undefined && newProperty) {
      i++;
      getProperty(indexes, i, newProperty);
    }
  } else {
    console.log(newProperty);
    //console.log(indexes);
    //console.log(el[indexes[i - 1] as P])
    return newProperty;
    // if (Object.getPrototypeOf(el) === String) {
    //   return newProperty;
    // } else return el[indexes[i] as P];
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
            <tr>
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
              <tr key={index}>
                {head.map((column) => {
                  const indexes = column.index.split(".");
                  const property = getProperty(indexes, 0, el);
                  console.log(property);
                  return (
                    <td key={indexes[0]}>
                      <>{property}</>
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
