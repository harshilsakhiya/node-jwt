const Form = require("../models/Form");
const mongoose = require("mongoose");
const ShortUniqueId = require("short-unique-id");

const randomId = new ShortUniqueId({ length: 9 });
exports.user = async (req, res) => {
  try {
    const user = await Form.find();
    return res.status(200).json({ status: true, user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.newUser = async (req, res) => {
  try {
    const {
      loanAmount,
      typeOfEmployment,
      monthlyIncome,
      currentCity,
      bankForSalary,
      status,
      customerRequirement,
      contectNo,
      remark
    } = req.body;

    const user = new Form({
      loanAmount,
      typeOfEmployment,
      monthlyIncome,
      currentCity,
      bankForSalary,
      status,
      customerRequirement,
      contectNo,
      trackingId: randomId(),
      remark
    });
    await user.save();
    return res.json({ status: true, user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remark } = req.body;

    const statusUpdate = await Form.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        status,
        remark,
      }
    );
    console.log({ statusUpdate });
    await statusUpdate.save();
    return res.status(200).json({ status: true });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      loanAmount,
      typeOfEmployment,
      monthlyIncome,
      currentCity,
      bankForSalary,
      customerRequirement,
      contectNo,
    } = req.body;

    const statusUpdate = await Form.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        loanAmount,
        typeOfEmployment,
        monthlyIncome,
        currentCity,
        bankForSalary,
        customerRequirement,
        contectNo,
      }
    );
    console.log({ statusUpdate });
    await statusUpdate.save();
    return res.status(200).json({ status: true });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    await Form.findByIdAndRemove(id);

    res.json({ message: "User deleted successfully." });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Form.find({
      _id: id,
    });
    console.log(  );
    return res.status(200).json({ status: true, user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.referenceById = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const user = await Form.find({
      trackingId: id,
    });
    console.log(user);
    return res.status(200).json({ status: true, user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
