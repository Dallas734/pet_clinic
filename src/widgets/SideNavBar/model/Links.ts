export interface DictionaryListLinks {
    [key: string]: string;
}

export const Petclinic = [
  { name: "Приемы", path: "/main/visit" },
  { name: "Питомцы", path: "/main/pets" },
  { name: "Владельцы", path: "/main/owners" }
];

export const MasterData = [
  { name: "Ветеринары", path: "/main/veterinarians" },
  { name: "Специальности", path: "/main/specialities" },
  { name: "Типы питомцев", path: "/main/petTypes" },
  { name: "Пользователи", path: "/main/users" }
];

export const Admin = [
  { name: "Консоль JMX", path: "/main/JMXConsole" },
  { name: "Забаненные", path: "/main/Locks" },
  { name: "Ресурсные роли", path: "/main/ResourceRoles" },
  { name: "Row-level роли", path: "/main/Row-levelRoles" },
  { name: "Инспектор сущностей", path: "/main/EntityInspector" }
];
