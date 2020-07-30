const Board = require('../models/board');

exports.create = async (req, res) => {
    const data = {
        owner: req.userId,
        ...req.body
    }

    try {
        const board = new Board(data);
        await board.save();

        res.status(201).json(board);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(400).json(error);
    }
}