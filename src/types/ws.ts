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
// Изменение статуса пользователя: {type: “status”, data: {userId: number, isOnline: bool}}
// Новое сообщение: {type: “new_message”, data: {chatId: number, text: string}}
// Прочитанное сообщение: {type: “read_message”, data: {chatId: number}}

