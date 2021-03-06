const Board = require('../../models/board');

exports.createBoard = async (req, res) => {
  const data = {
    ...req.body,
    owner: req.userId,
  };

  try {
    const board = new Board(data);
    await board.save();

    res.status(201).json(board);
  } catch (error) {
    // TODO Return a better error
    res.status(400).json(error);
  }
};

exports.readBoard = async (req, res) => {
  const { board } = req;

  try {
    await board.populate('tasks').execPopulate();

    res.status(200).json(board);
  } catch (error) {
    // TODO Return a better error
    res.status(500).json(error);
  }
};

exports.updateBoard = async (req, res) => {
  const { board } = req;
  const data = req.body;

  try {
    Object.keys(data).forEach((update) => {
      board[update] = data[update];
    });
    await board.save();

    res.status(200).json(board);
  } catch (error) {
    // TODO Return a better error
    res.status(500).json(error);
  }
};

exports.deleteBoard = async (req, res) => {
  const { board } = req;

  try {
    await board.remove();

    res.status(200).json(board);
  } catch (error) {
    // TODO Return a better error
    res.status(500).json(error);
  }
};
