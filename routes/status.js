const express = require("express");
const router = express.Router();
const {blockUser,archiveUser,activateUser,} = require("../controllers/accountStatusController");

router.put("/blockuser/:userId", blockUser);
router.put("/archiveuser/:userId", archiveUser);
router.put("/activateuser/:userId", activateUser);
module.exports = router;