const express = require("express");
const DoctorRouter = express.Router();
const { DoctorModel } = require("../Model/Doctor.Model");

DoctorRouter.get("/", async (req, res) => {
  try {
    const { specialization, search, name } = req.query;
    const doctors = await DoctorModel.find({});

    let filteredData = doctors;
    if (specialization) {
      filteredData = filteredData.filter(
        (doctor) => doctor.specialization.toLowerCase() === specialization.toLowerCase()
      );
    }
    if (search) {
      const searchQuery = search.toLowerCase();
      filteredData = filteredData.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery)
      );
    }

    res.status(200).send(filteredData);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

DoctorRouter.post("/appointments", async (req, res) => {
  try {
    const doctor = new DoctorModel(req.body);
    await doctor.save();
    res.status(200).send({ msg: "New Appointment has been Added" });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

DoctorRouter.patch("/update/:doctorId", async (req, res) => {
  const { doctorId } = req.params;
  try {
    await DoctorModel.findByIdAndUpdate({ _id: doctorId }, req.body);
    res.status(200).send({ msg: `The Appontment been updated.` });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

DoctorRouter.delete("/delete/:doctorId", async (req, res) => {
  const { doctorId } = req.params;
  try {
    await DoctorModel.findByIdAndDelete({ _id: doctorId });
    res.status(200).send({ msg: `The Appontment been deleted.` });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = { DoctorRouter };
