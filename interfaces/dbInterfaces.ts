export interface IGood {
  _id?: object
  title: string
  gender: string
  country: string
  desc: string
  category: object
  imgURL: string
  price: number
  sale: number,
  operation: string
}

export interface ICategory {
  [x: string]: any;
  _id?: object
  title: string
  desc: string
  good_list: any[]
}

export interface IUser {
  email: string
  password: string
  isAdmin: boolean
}