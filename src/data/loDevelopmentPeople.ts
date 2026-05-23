export type LoDevelopmentGroup =
  | "LO Development"
  | "Corporate Coaches"
  | "Marketing";

export type LoDevelopmentPerson = {
  id: string;
  name: string;
  role: string;
  group: LoDevelopmentGroup;
  email: string;
  image: string;
  sortOrder: number;
};

export const loDevelopmentDepartmentContact = {
  name: "LO Development",
  email: "lodevelopment@loanfactory.com",
  description:
    "Use this department email for LO Development questions, training help, and support direction.",
};

export const loDevelopmentPeople: LoDevelopmentPerson[] = [
  {
    id: "andre-king",
    name: "Andre King",
    role: "LO Development Department Manager",
    group: "LO Development",
    email: "andre.king@loanfactory.com",
    image: "/team/andre-king.png",
    sortOrder: 10,
  },
  {
    id: "kevin-truong",
    name: "Kevin Truong",
    role: "LO Development",
    group: "LO Development",
    email: "kevin.truong@loanfactory.com",
    image: "/team/kevin-truong.png",
    sortOrder: 20,
  },
  {
    id: "dennis-nguyen",
    name: "Dennis Nguyen",
    role: "LO Development",
    group: "LO Development",
    email: "dennis@loanfactory.com",
    image: "/team/dennis-nguyen.png",
    sortOrder: 30,
  },
  {
    id: "benjamin-huynh",
    name: "Benjamin Huynh",
    role: "LO Development",
    group: "LO Development",
    email: "benjamin@loanfactory.com",
    image: "/team/benjamin-huynh.png",
    sortOrder: 40,
  },
  {
    id: "tara-bartoli",
    name: "Tara Bartoli",
    role: "LO Development",
    group: "LO Development",
    email: "tara.bartoli@loanfactory.com",
    image: "/team/tara-bartoli.png",
    sortOrder: 50,
  },
  {
    id: "jay-nguyen",
    name: "Jay Nguyen",
    role: "LO Development",
    group: "LO Development",
    email: "jay.nguyen@loanfactory.com",
    image: "/team/jay-nguyen.png",
    sortOrder: 60,
  },
  {
    id: "alexander-cardoso",
    name: "Alexander Cardoso",
    role: "Loan Officer / Corporate Coach",
    group: "Corporate Coaches",
    email: "acardoso@loanfactory.com",
    image: "/team/alexander-cardoso.png",
    sortOrder: 110,
  },
  {
    id: "alessandra-pereira",
    name: "Alessandra Pereira",
    role: "Loan Officer / Corporate Coach",
    group: "Corporate Coaches",
    email: "alessandra@loanfactory.com",
    image: "/team/alessandra-pereira.png",
    sortOrder: 120,
  },
  {
    id: "edward-arvizo",
    name: "Edward Arvizo",
    role: "Loan Officer / Branch Manager / Head of Corporate Coach",
    group: "Corporate Coaches",
    email: "edward.arvizo@loanfactory.com",
    image: "/team/edward-arvizo.png",
    sortOrder: 130,
  },
  {
    id: "bob-shahidadpury",
    name: "Bob Shahidadpury",
    role: "Loan Officer / Corporate Coach",
    group: "Corporate Coaches",
    email: "bobs@loanfactory.com",
    image: "/team/bob-shahidadpury.png",
    sortOrder: 140,
  },
  {
    id: "duc-dang",
    name: "Duc Dang",
    role: "Loan Officer / Corporate Coach",
    group: "Corporate Coaches",
    email: "ddang@loanfactory.com",
    image: "/team/duc-dang.png",
    sortOrder: 150,
  },
  {
    id: "jody-richards",
    name: "Jody Richards",
    role: "Loan Officer / Corporate Coach",
    group: "Corporate Coaches",
    email: "jody.richards@loanfactory.com",
    image: "/team/jody-richards.png",
    sortOrder: 160,
  },
  {
    id: "john-lemos",
    name: "John P. Lemos",
    role: "Loan Officer / Corporate Coach",
    group: "Corporate Coaches",
    email: "john.lemos@loanfactory.com",
    image: "/team/john-lemos.png",
    sortOrder: 170,
  },
  {
    id: "duyen-nguyen",
    name: "Duyen Nguyen",
    role: "Marketing Manager",
    group: "Marketing",
    email: "duyen@loanfactory.com",
    image: "/team/duyen-nguyen.png",
    sortOrder: 210,
  },
  {
    id: "leslie-do",
    name: "Leslie Do",
    role: "Marketing",
    group: "Marketing",
    email: "leslie@loanfactory.com",
    image: "/team/leslie-do.png",
    sortOrder: 220,
  },
];

export const loDevelopmentGroups: LoDevelopmentGroup[] = [
  "LO Development",
  "Corporate Coaches",
  "Marketing",
];
