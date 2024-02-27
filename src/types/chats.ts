interface IChat{
    chatId: number,
    recipientId: number,
    recipientLogin: string,
    isRecipientOnline: boolean,
    unreadMessagesNumber: number,
    lastMessage: string
}
interface INotInChatUser{
    userId: number,
    login: string
}
interface IWSData {
    type: messageType,
    dat: any
}
type messageType = 'status'|'new_message'|'read_message'

interface IMessage{
    messageId: number,
    senderId: number,
    messageSendingDate: string,
    isMessageRead: false,
    message: string
}