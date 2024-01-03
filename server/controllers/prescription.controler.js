const Prescription = require("../models/prescription.model");
const multer = require("multer");
const path = require("path");

// Create a storage engine to specify where and how to save the images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination folder for storing the uploaded images
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded image using the current timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Create the multer instance with the storage engine
const upload = multer({ storage });

// Controller function to handle the patient profile image upload
exports.uploadProfileImage = upload.single("imageFile", (req, res) => {
  // 'imageFile' should match the name attribute of the file input in the form

  // Check if a file was provided in the request
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided" });
  }

  // File was uploaded successfully, return the file path or URL to the frontend
  const filePath = req.file.path; // The file path where the image is saved on the server

  // You may want to store the `filePath` in the database and associate it with the patient data

  res.json({ imagePath: filePath });
});

// Controller for adding a new request
exports.addRequest = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const {
      nurseId,
      doctorId,
      patientName,
      patientRegNo,
      age,
      year,
      department,
      gender,
      temperature,
      date,
      spo2,
      heartRate,
      bloodPressure,
      tests,
      medicine,
    } = req.body;

    const request = new Prescription({
      nurseId,
      doctorId,
      patientName,
      patientRegNo,
      age,
      year,
      department,
      gender,
      temperature,
      spo2,
      heartRate,
      bloodPressure,
      date,
      medicine,
      tests,
      isCompleted: false,
      completedBy: "Nurse", // Set to 'Nurse' as nurse raises the request initially
    });

    const savedRequest = await request.save();
    res.json(savedRequest);
  } catch (error) {
    console.error("Error adding request:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the request" });
  }
};

// Controller for getting all requests for a specific doctor
exports.getAllRequestsForDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const requests = await Prescription.find({ doctorId });
    res.json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the requests" });
  }
};

// Controller for getting all requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Prescription.find();
    res.json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the requests" });
  }
};

exports.getAllStudentPrescriptions = async (req, res) => {
  try {
    const registerNumber = req.params.reg;
    const requests = await Prescription.find({ patientRegNo: registerNumber });
    res.json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the requests" });
  }
};

// Controller for getting specific request by Id
exports.getRequest = async (req, res) => {
  try {
    const request = await Prescription.findById(req.params.id);
    res.json(request);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the requests" });
  }
};

// Controller for updating the response to a request
exports.updateResponse = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const { symptoms, medicine, nextVisit, advice, tests } = req.body;
    console.log("Request body:", req.body);

    const updatedResponse = await Prescription.findByIdAndUpdate(
      requestId,
      {
        symptoms,
        medicine,
        nextVisit,
        tests,
        advice,
        isCompleted: true,
        completedBy: "Doctor",
      },
      { new: true }
    );

    res.json(updatedResponse);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the response" });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const deletedRequest = await Prescription.findByIdAndDelete(requestId);
    res.status(200).json(deletedRequest);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the request" });
  }
};
