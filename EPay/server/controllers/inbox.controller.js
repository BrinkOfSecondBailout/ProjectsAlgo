const {Inbox} = require('../models/inbox.model');
const {Message} = require('../models/message.model');
const {User} = require('../models/user.model');

module.exports.addToInbox = async(request, response) => {
    const id = request.params.id;
    try {
        const inbox = await Inbox.findOne({userId: id})
        const itemIndex = inbox.messageThreads.findIndex(thread => thread.correspondence._id === request.body.user._id)
        const message = await Message.create({message: request.body.message})

        const inbox2 = await Inbox.findOne({userId: request.body.user._id})
        

        if (itemIndex === -1) {
            const correspondence = await User.findOne({_id: request.body.user._id})
            inbox.messageThreads.push({correspondence: correspondence})
            inbox.messageThreads[0].messages.push({path: "in", message: message})
            inbox.newMessageCount += 1
            await inbox.save();

            const correspondence2 = await User.findOne({_id: id})
            inbox2.messageThreads.push({correspondence: correspondence2})
            inbox2.messageThreads[0].messages.push({path: "out", message: message})
            await inbox2.save();

            response.json("New message thread successfully added")
        } else {
            inbox.messageThreads[itemIndex].messages.push({message: message})
            inbox.newMessageCount += 1
            await inbox.save();
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
        // console.log(itemIndex)
        const allMessages = inbox.messageThreads[itemIndex].messages
        response.json(allMessages)
    } catch (err) {
        response.json(err)
    }
}