const Board = require('../../models/board');

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
    const boardId = req.params.boardId;
    const userId = req.userId;

    try {
        const board = await Board.findOne({ _id: boardId, owner: userId });
        if (!board) {
            return res.status(404).json();
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

exports.update = async (req, res) => {
    const boardId = req.params.boardId;
    const userId = req.userId;
    const data = req.body;

    try {
        const board = await Board.findOne({ _id: boardId, owner: userId });
        if (!board) {
            return res.status(404).json();
        }

        Object.keys(data).forEach((update) => {
            board[update] = data[update];
        });
        await board.save();

        res.status(200).json(board);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
}

exports.destroy = async (req, res) => {
    const boardId = req.params.boardId;
    const userId = req.userId;

    try {
        const board = await Board.findOne({ _id: boardId, owner: userId });
        if (!board) {
            return res.status(404).json();
        }

        await board.remove();

        res.status(200).json(board);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
}
