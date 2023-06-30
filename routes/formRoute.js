const express = require("express");
const formController = require("../controller/formController");
const { withAuth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", withAuth, formController.user);
router.post("/", formController.newUser);

router.delete("/:id", withAuth, formController.deleteUser);
router.put("/:id", withAuth, formController.updateStatus);
router.get("/:id", formController.getById);
router.put("/updateform/:id", withAuth, formController.updateForm);
router.get("/reference/:id",  formController.referenceById);


// router.use((err, req, res, next) => {
//   next(err)
// })

module.exports = router;
