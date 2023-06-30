const mongoose = require("mongoose");

const FormSchema = mongoose.Schema({
  loanAmount: { type: Number, required: true },
  typeOfEmployment: { type: String, required: true },
  monthlyIncome: { type: Number, required: true },
  currentCity: { type: String, required: true },
  bankForSalary: { type: String, required: true },
  status: { type: String, required: true },
  customerRequirement: { type: String, required: true },
  contectNo: { type: Number, required: true },
  trackingId: { type: String, required: true },
  remark: { type: String },

});

const Form = mongoose.model("form", FormSchema);

module.exports = Form;
