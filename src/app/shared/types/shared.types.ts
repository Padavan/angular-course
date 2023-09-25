 export type Course = {
  id: string;
  title: string,
  description: string,
  creationDate: string,
  duration: number,
  authors: Array<string>,
}

export type Author = {
  id: string,
  name: string,
}

export type AddCourse = {
  title: string,
  description: string,
  duration: number,
  authors: string[],
}

export type User = {
  name: string,
  email: string,
  id: string,
  role: "user" | "admin",
  password: string,
}

export type Credentials = {
  name?: string,
  email: string,
  password: string,
}