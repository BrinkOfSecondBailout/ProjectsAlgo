const {Watchlist} = require('../models/watchlist.model');

module.exports.addToWatchlist = async (request, response) => {
    const id = request.params.id;
    try {
        const watchlist = await Watchlist.findOne({userId: id})
        watchlist.items.push({item: request.body.item})
        watchlist.save()
        response.json("Watchlist successfully updated")
    } catch(err) {
        response.json(err)
    }
}

module.exports.showMyWatchlist = async (request, response) => {
    const id = request.params.id;
    Watchlist.findOne({userId: id}).populate('items.item')
    .then(watchlist => {
        response.json(watchlist)
    })
    .catch(err => {
        response.json(err)
    })
}