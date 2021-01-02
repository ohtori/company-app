//Authorization
export interface IAuth {
  email: string
  password: string
}

export interface IAuthErrors {
  emailError: string
  passwordError: string
  serverError: string
}

//Global Authorization
export interface IUser {
  token: string
  role: string
}

export interface IAuthContext {
  token: string
  role: string
  login: (user: IUser) => void
  logout: () => void
}