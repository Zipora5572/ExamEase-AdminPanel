export interface User {
    id: number
    tz: string
    firstName: string
    lastName: string
    email: string
    phoneNumber?: string
    address?: string
    createdAt: Date
    lastLogin: string

    passwordHash?: string; 
  }
  