const {Inbox} = require('../models/inbox.model');
const {Message} = require('../models/message.model');
const {User} = require('../models/user.model');

module.exports.addToInbox = async(request, response) => {
    const id = request.params.id;
    try {
        const inbox = await Inbox.findOne({userId: id})
        const itemIndex = inbox.messageThreads.findIndex(thread => thread.correspondence._id == request.body.user._id)
        const message = await Message.create({message: request.body.message})
        const message2 = await Message.create({message: request.body.message, unread: "false"})
        const inbox2 = await Inbox.findOne({userId: request.body.user._id})
        

        if (itemIndex === -1) {

            const correspondence = await User.findOne({_id: request.body.user._id})
            inbox.messageThreads.push({correspondence: correspondence})

            const newItemIndex = inbox.messageThreads.findIndex(thread => thread.correspondence._id == request.body.user._id)

            inbox.messageThreads[newItemIndex].messages.push({path: "in", message: message})
            inbox.messageThreads[newItemIndex].updatedAt = Date.now()
            inbox.newMessageCount += 1
            await inbox.save();

            const correspondence2 = await User.findOne({_id: id})
            inbox2.messageThreads.push({correspondence: correspondence2})
            const newItemIndex2 = inbox2.messageThreads.findIndex(thread => thread.correspondence._id == id)
            inbox2.messageThreads[newItemIndex2].messages.push({path: "out", message: message2})
            inbox2.messageThreads[newItemIndex2].updatedAt = Date.now()
            await inbox2.save();

            response.json("New message thread successfully added")

        } else {
            
            inbox.messageThreads[itemIndex].messages.push({path: "in", message: message})
            inbox.messageThreads[itemIndex].updatedAt = Date.now()
            inbox.newMessageCount += 1
            await inbox.save();

            
            const itemIndex2 = inbox2.messageThreads.findIndex(thread => thread.correspondence._id == id)
            inbox2.messageThreads[itemIndex2].messages.push({path: "out", message: message2})
            inbox2.messageThreads[itemIndex2].updatedAt = Date.now()
            await inbox2.save();

            response.json("New message successfully added to existing thread")
        }
    } catch(err) {
        response.json(err)
    }
}

module.exports.showMyInbox = async(request, response) => {
    const id = request.params.id;
    Inbox.findOne({userId: id})
        .populate({
            path: 'messageThreads.correspondence',
            model: 'User'
        })
        .populate({
            path: 'messageThreads.messages.message',
            model: 'Message'
        })
        .then(inbox => response.json(inbox))
        .catch(err => response.json(err))
}

module.exports.allMessagesByCorrespondence = async(request, response) => {
    const id = request.params.id;
    const myId = request.params.userId;

    try {
        const inbox = await Inbox.findOne({userId: myId})
        .populate({
            path: 'messageThreads.correspondence',
            model: 'User'
        })
        .populate({
            path: 'messageThreads.messages.message',
            model: 'Message'
        })
        const itemIndex = inbox.messageThreads.findIndex(thread => thread.correspondence._id == id)
        const allMessages = inbox.messageThreads[itemIndex].messages
        for (let i = 0; i < allMessages.length; i++) {
            allMessages[i].message.unread = "false"
            await allMessages[i].message.save();
        }
        await inbox.save()
        response.json(allMessages)
    } catch (err) {
        response.json(err)
    }
}

module.exports.resetNewMessageCount = async (request, response) => {
    const id = request.params.id;
    try {
        const inbox = await Inbox.findOne({userId: id})
        inbox.newMessageCount = 0;
        await inbox.save();
        response.json("Reset successful")
    } catch (err) {
        response.json(err)
    }
}