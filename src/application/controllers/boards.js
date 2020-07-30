const Board = require('../models/board');

exports.create = async (req, res) => {
    const data = {
        owner: req.userId,
        ...req.body
    };

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

exports.show = async (req, res) => {
    const boardId = req.params.id;

    // TODO check if the user should be able to access this table
    // right now the user can access boards from other users.

    try {
        const board = await Board.findById(boardId);
        if (!board) {
            return res.send(404).json();
        }

        await board.populate('tasks').execPopulate();
        const tasks = board.tasks;

        res.status(200).json({ board, tasks });
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
}
