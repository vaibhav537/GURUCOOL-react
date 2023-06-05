const express = require("express");

const router = express.Router();

const {
  contact,
  registerTeacher,
  generateOtp,
  verifyOtpUser,
  fetchCategory,
  registerStudent,
  loginTeacher,
  registerCategory,
  loginStudent,
  adminlogin,
  updateadmin,
  adminotp,
  verifyOtpAdmin,
  addCategory,
  deleteCategory,
  teacherTokenData,
  checkTeacherPassword,
  updateTeacher,
  deleteTeacher,
  studentTokenData,
  checkStudentPassword,
  updateStudent,
  deleteStudent,
  fetchAdminStudent,
  fetchAdminTeacher,
  studentAdminDelete,
  teacherAdminDelete,
} = require("../controllers/userController");

router.post("/contact", contact);

router.post("/registerTeacher", registerTeacher);

router.post("/loginTeacher", loginTeacher);

router.post("/adminlogin", adminlogin);

router.post("/updateadmin", updateadmin);

router.post("/loginStudent", loginStudent);

router.post("/registerCategory/:id", registerCategory);

router.delete("/deleteCategory/:categoryTitle", deleteCategory);

router.post("/registerStudent", registerStudent);

router.post("/generateOtp", generateOtp);

router.post("/verifyOtpUser", verifyOtpUser);

router.get("/fetchCategory", fetchCategory);

router.post("/adminotp", adminotp);

router.post("/verifyOtpAdmin", verifyOtpAdmin)

router.post("/addCategory", addCategory);

router.post("/teacherTokenData", teacherTokenData);

router.post("/studentTokenData", studentTokenData);

router.post("/checkTeacherPassword", checkTeacherPassword);

router.post("/checkStudentPassword", checkStudentPassword);

router.put("/updateTeacher", updateTeacher);

router.delete("/deleteTeacher", deleteTeacher);

router.put("/updateStudent", updateStudent);

router.get("/fetchAdminStudent", fetchAdminStudent);

router.get("/fetchAdminTeacher", fetchAdminTeacher);

router.delete("/deleteStudent", deleteStudent);

router.delete("/studentAdminDelete/:id", studentAdminDelete)

router.delete("/teacherAdminDelete/:id", teacherAdminDelete)


module.exports = router;
