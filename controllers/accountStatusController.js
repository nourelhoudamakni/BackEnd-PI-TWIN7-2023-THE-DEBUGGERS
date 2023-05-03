const User = require('../models/User');

// function to block a user
const blockUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(userId, { status: 'blocked' }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function to archive a user
const archiveUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(userId, { status: 'archived' }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function to activate a user
const activateUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
  
      if (user.status === 'blocked') {
        user.status = 'active';
        await user.save();
        res.status(200).json(user);
      } else {
        res.status(400).json({ message: 'User is not blocked' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = {
  blockUser,
  archiveUser,
  activateUser,
};
