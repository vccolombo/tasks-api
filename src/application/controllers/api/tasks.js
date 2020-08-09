const Task = require('../../models/task');

// Params:
// completed? true, false (default: all)
// count? int: the limit of results in the response (default: all)
// start? int: the number of results to skip before finding the result (default: 0)
// sortby? createdAt, updatedAt (default: incomplete first)
exports.readAllTasks = async (req, res) => {
  const board = req.board;

  const match = {};
  if (req.query.completed) {
    match.completed = req.query.completed.toLowerCase() === 'true';
  }

  const sort = {};
  if (req.query.sortby) {
    const parts = req.query.sortby.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  } else {
    sort['completed'] = 1;
  }

  const options = {
    limit: parseInt(req.query.count),
    skip: parseInt(req.query.start),
    sort,
  };

  try {
    await board
      .populate({
        path: 'tasks',
        match,
        options,
      })
      .execPopulate();

    res.status(200).json(board.tasks);
  } catch (error) {
    console.error(error);
    // TODO Return a better error
    res.status(500).json(error);
  }
};

exports.createTask = async (req, res) => {
  const boardId = req.params.boardId;
  const data = {
    ...req.body,
    board: boardId,
  };

  try {
    const task = new Task(data);
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    // TODO Return a better error
    res.status(400).json(error);
  }
};

exports.readTask = async (req, res) => {
  const taskId = req.params.taskId;
  const boardId = req.params.boardId;

  try {
    const task = await Task.findOne({
      _id: taskId,
      board: boardId,
    });
    if (!task) {
      return res.status(404).json();
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    // TODO Return a better error
    res.status(500).json(error);
  }
};

exports.updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const boardId = req.params.boardId;
  const data = req.body;

  try {
    const task = await Task.findOne({
      _id: taskId,
      board: boardId,
    });
    if (!task) {
      return res.status(404).json();
    }

    Object.keys(data).forEach((update) => {
      task[update] = data[update];
    });
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    // TODO Return a better error
    res.status(400).json(error);
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  const boardId = req.params.boardId;

  try {
    const task = await Task.findOne({
      _id: taskId,
      board: boardId,
    });
    if (!task) {
      return res.status(404).json();
    }

    task.remove();

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    // TODO Return a better error
    res.status(500).json(error);
  }
};
