export interface RootUser {
    username: string
    id: number
    created_at: string
    expires_at: string
}


export type ChatRooms = ChatRoom[]

export interface ChatRoom {
    name: string
    id: string
    created_at: string
    expires_at: string
}


export type Messages = Message[]

export interface Message {
  content: string
  id: number
  created_at: string
  room_id: string
  user_id: number
  username: string
}
