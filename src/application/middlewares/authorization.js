const Board = require('../models/board');

exports.verifyBoardAuthorization = async (req, res, next) => {
    const boardId = req.params.boardId;
    const userId = req.userId;

    try {
        const board = await Board.findOne({ _id: boardId, owner: userId });
        if (!board) {
            // return 404 to avoid exposing the document existence
            return res.status(404).json();
        }

        req.board = board;

        next();
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
};
