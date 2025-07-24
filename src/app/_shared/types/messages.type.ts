export interface Message {
  id?: string;
  title: string;
  email: string;
  message: string;
  createdAt?: Date;
  seen?: boolean;
}
