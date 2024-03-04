interface IStatusMessage{
    type: 'status',
    data: {
        userId: number,
        isOnline: boolean
    }
}

interface INewMessage{
    type: 'new_message',
    data: {
        chatId: number,
        messageId: number,
        senderId: number,
        messageSendingDate: string,
        isMessageRead: false,
        message: string
    }
}

interface IReadMessage{
    type: 'read_message',
    data: {
        chatId: number
    }
}

interface INewChat{
    type: 'new_chat',
    data: {
        chatId: number,
        recipientId: number,
        recipientLogin: string,
        isRecipientOnline: boolean,
        unreadMessagesNumber: number,
        lastMessage: string
    }
}
// Изменение статуса пользователя: {type: “status”, data: {userId: number, isOnline: bool}}
// Новое сообщение: {type: “new_message”, data: {chatId: number, text: string}}
// Прочитанное сообщение: {type: “read_message”, data: {chatId: number}}

