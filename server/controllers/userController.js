const User = require("../models/usersSchema");
const TeacherSchema = require("../models/teacherSchema");
const StudentSchema = require("../models/studentSchema");
const userOtp = require("../models/userOtpSchema");
const OtpSchema = require("../models/adminotpSchema");
const AdminSchema = require("../models/adminSchema");
const CategorySchema = require("../models/categorySchema");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

module.exports.contact = async (req, res, next) => {
  const { name, email, phone, desc } = req.body;

  try {
    if (!name || !email || !phone || !desc) {
      return res
        .status(400)
        .json({ success: false, error: "Please fill all fields" });
    }
    const user = new User({
      name,
      email,
      phone,
      desc,
    });
    const done = await user.save();

    if (done) {
      return res
        .status(201)
        .json({ success: true, message: "Submitted Successfully" });
    } else {
      return res
        .status(400)
        .json({ success: true, error: "Something went wrong" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: true, error: "Something went wrong" });
  }
};

module.exports.registerTeacher = async (req, res, next) => {
  const { name, email, phone, gender, password, confirmpassword, pic } =
    req.body;
  if (!name || !email || !phone || !gender || !password || !confirmpassword) {
    return res
      .status(400)
      .json({ success: false, error: "Please fill all fields" });
  }
  try {
    const userExists = await TeacherSchema.findOne({ email });
    if (userExists) {
      res.status(400).json({ success: "already", message: "Already Exist" });
    }
    const encryptedPassword = CryptoJS.AES.encrypt(
      JSON.stringify(password),
      process.env.CRYPTO_SECRET
    ).toString();

    const teacher = await TeacherSchema.create({
      name,
      email,
      phone,
      gender,
      password: encryptedPassword,
      pic,
    });
    if (teacher) {
      res.json({ success: true, teacher });
    } else {
      res.status(400);
      throw new Error("Failed to create the teacher");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Error Occured TimeOUt" });
  }
};

module.exports.registerStudent = async (req, res, next) => {
  const { name, email, phone, gender, password, confirmpassword, pic } =
    req.body;
  if (!name || !email || !phone || !gender || !password || !confirmpassword) {
    throw new Error("Please Fill all fields");
  }

  try {
    const userExists = await StudentSchema.findOne({ email });
    if (userExists) {
      res.status(400).json({ success: "already", msg: "User Already Exist" });
    }
    const encryptedPassword = CryptoJS.AES.encrypt(
      JSON.stringify(password),
      process.env.CRYPTO_SECRET
    ).toString();

    const student = await StudentSchema.create({
      name,
      email,
      phone,
      gender,
      password: encryptedPassword,
      pic,
    });

    if (student) {
      const token = jwt.sign({ student }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      res.status(201).json({ success: true, token });
    } else {
      res.status(400).json({ success: false, msg: "Error Occured !!" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.registerCategory = async (req, res, next) => {
  try {
    const teacherId = req.params.id;

    const teacherCategory = req.body.category;

    const teacher = await TeacherSchema.findOne({ _id: teacherId });

    teacher.category = teacherCategory;

    const teacherUpdated = await teacher.save();

    if (teacherUpdated) {
      const token = jwt.sign({ teacherUpdated }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      res.status(201).json({ success: true, token });
    } else {
      res.status(400).json({ success: false, msg: "Error Occured!!" });
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.loginTeacher = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const teacher = await TeacherSchema.findOne({ email });

    const bytes = CryptoJS.AES.decrypt(
      teacher.password,
      process.env.CRYPTO_SECRET
    );
    const decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    if (teacher && password === decryptedPassword) {
      const token = jwt.sign({ teacher }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      res.status(222).json({ success: true, token });
    } else {
      res.status(444).json({ success: false, message: "ERROR" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "timeout", message: "Error Occured" });
  }
};

module.exports.loginStudent = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const student = await StudentSchema.findOne({ email });

    const bytes = CryptoJS.AES.decrypt(
      student.password,
      process.env.CRYPTO_SECRET
    );
    const decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    if (student && password === decryptedPassword) {
      const token = jwt.sign({ student }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      res.status(222).json({ success: true, token });
    } else {
      res.status(444).json({ success: false, message: "ERROR" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "timeout", message: "Error Occured" });
  }
};

const OtpSending = (email, otpCode, name) => {
  let nameUpperCase = name.toUpperCase();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, //the secure true is only works at 465
    auth: {
      user: "g80561390@gmail.com", //Here is the email from where we send the email
      pass: "mwwymmngfdhbrcnx", // Here is app password of above email
    },
  });

  let mailOptions = {
    from: 'Guru Cool "g80561390@gmail.com"', //From where we send the email
    to: email, //Here we enter where we have to send the email
    subject: "Verify Your Email", //This the Subject of the Email
    html: `<head>
   <link rel="preconnect" href="https://fonts.googleapis.com">
 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet">
 </head>
 <div style="font-family: 'Josefin Sans',sans-serif;min-width:1000px;overflow:auto;line-height:2">
   <div style="margin:50px auto;width:70%;padding:20px 0">
     <div style="border-bottom:1px solid #eee">
       <a href="" style="font-size:1.4em;color: black;text-decoration:none;font-weight:400; font-family:josefin sans;">${nameUpperCase}</a>
     </div>
     <p style="font-size:1.1em">Hi,</p>
     <p>Thank you for choosing the GURUCOOL. Use the following OTP to complete your Sign Up procedures. <span style = "color:red;"> OTP is valid for only <span style="font-weight:bold;" >3 minutes!!</span> </span> </p>
     <h2 style="background: #475569;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otpCode}</h2>
     <p style="font-size:0.9em;">Regards,<br />GURUCOOL TEAM</p>
     <hr style="border:none;border-top:1px solid #eee" />
     <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
       <p>GuruCool Inc</p>
       <p>VBPC, Udaipur</p>
       <p>India</p>
     </div>
   </div>
 </div>`, //Here we sending the opt to reciver here it is vaibhav`s email
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error); //If there any error occurs then we print that error
    } else {
      console.log("email Sent: " + info.response); //If we send the email successfully the this message will be log to the console
    }
  });
};

module.exports.generateOtp = async (req, res, next) => {
  const { email, name } = req.body; // destructring the email and name of the user that comes from frontend

  if (email) {
    // a function for the generating the otp message
    function generateOTP() {
      // Generate a random 6-digit OTP
      let otpCode = "";
      for (let i = 0; i < 6; i++) {
        otpCode += Math.floor(Math.random() * 10);
      }
      //if somehow the otp doesn't generated then it will recall the function;
      if (otpCode === undefined) {
        generateOTP();
      }

      //returning the otp
      return otpCode;
    }

    // another function for generating the expriy time for the otp
    function generateOTPWithExpiry() {
      // Generate a random OTP with an expiration time of 5 minutes
      const otpCode = generateOTP(); //calling the otp generate function
      const expiryTime = Date.now() + 300000; // 5 minutes from now in milliseconds
      //returning the otp and its expiry time
      return { otpCode, expiryTime };
    }
    //destructring the otp code and its expiry time
    const { otpCode, expiryTime } = generateOTPWithExpiry();

    let optData = new userOtp({
      // creating new document in mongo db
      email: email, // user email sending
      code: otpCode, // saving the opt code to mongo db
      expireIn: new Date(expiryTime), // setting the  expiry time of the otp
    });

    let otpResponse = await optData.save(); // saving the document created above

    if (otpResponse) {
      res.status(201).json({ success: true, msg: "OTP GENERATED" }); // if document is generated then sending success
      await OtpSending(email, otpCode, name);
    } else {
      res.status(404).json({ success: false, msg: "OTP NOT FOUND" }); // any error ocuurs then it woll show this error
    }
  }
};

module.exports.verifyOtpUser = async (req, res, next) => {
  let data = await userOtp.findOne({
    email: req.body.email,
    otp: req.body.otpCode,
  }); //finding that otp that user enters is available in db or not

  if (!data) {
    console.log("OTP not found");
    res.status(401).json({ success: false, msg: "NO otp" });
    return false;
  }

  res.status(200).json({ success: true, msg: "Found otp" });
  console.log("OTP is valid");
  const deleteOtp = await userOtp.deleteOne({ otp: req.body.optCode });
  if (deleteOtp) {
    console.log("OTP DELETED");
  } else {
    console.log("OTP NOT DELETED");
  }
};

module.exports.fetchCategory = async (req, res) => {
  const data = await CategorySchema.find({});
  res.status(201).json(data);
};

module.exports.adminlogin = async (req, res) => {
  const { password, email } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Email or Password is missing" });
    return false;
  }
  try {
    const admin = await AdminSchema.findOne({ email });

    if (admin) {
      const bytes = CryptoJS.AES.decrypt(
        admin.password,
        process.env.CRYPTO_SECRET
      );

      const decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      if (admin && password === decryptedPassword) {
        const token = jwt.sign({ admin }, process.env.JWT_SECRET, {
          expiresIn: "2d",
        });
        res.status(222).json({ success: true, token });
      } else {
        res.status(444).json({ success: false, message: "ERROR" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error Occured" });
    return false;
  }
};

module.exports.updateadmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ Error: "Please fill in the email" });
    }
    const admin = await AdminSchema.findOne({
      _id: "642ea0bac525ef7a032c95de",
    });
    const encryptedPassword = CryptoJS.AES.encrypt(
      JSON.stringify(password),
      process.env.CRYPTO_SECRET
    ).toString();

    admin.email = email;
    admin.password = encryptedPassword;
    const done = await admin.save();
    if (done) {
      res
        .status(201)
        .json({ success: true, message: "Successfully updated !!" });
    } else {
      res.status(404).json({ success: false, message: "Error updating !!" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.verifyOtpAdmin = async (req, res) => {
  let otpDoc = await OtpSchema.findOne({
    email: "vaibhavmali537@gmail.com",
    code: req.body.otpCode,
  });

  if (!otpDoc) {
    console.log("OTP not found");
    res.status(401).json({ success: false, msg: "NO otp" });
    return false;
  }

  res.status(200).json({ success: true, msg: "Found otp" });
  console.log("OTP is valid");

  let deleteOtp = await OtpSchema.deleteOne({
    code: req.body.otpCode,
  });
  if (deleteOtp) {
    console.log("OTP DELETED");
  } else {
    console.log("OTP NOT DELETED");
  }
};

const mailer = (email, otpCode) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, //the secure true is only works at 465
    auth: {
      user: "g80561390@gmail.com", //Here is the email from where we send the email
      pass: "mwwymmngfdhbrcnx", // Here is app password of above email
    },
  });

  let mailOptions = {
    from: 'Guru Cool "g80561390@gmail.com"', //From where we send the email
    to: email, //Here we enter where we have to send the email
    subject: "Change the  Id And Password For Admin User", //This the Subject of the Email
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">GURU COOL</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Use the following Verification Code to reset the Id and Password and to Generate the new One. OTP is valid for 2 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otpCode}</h2>
      <p style="font-size:0.9em;">Regards,<br />Guru Cool Team</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Guru Cool Head Offices</p>
        <p>VBPC</p>
        <p>Salumbar, Udaipur</p>
      </div>
    </div>
  </div>`, //Here we sending the opt to reciver here it is vaibhav`s email
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error); //If there any error occurs then we print that error
    } else {
      console.log("email Sent: " + info.response); //If we send the email successfully the this message will be log to the console
    }
  });
};

module.exports.adminotp = async (req, res) => {
  let email = "vaibhavmali537@gmail.com"; //email of the trusted person

  if (email) {
    // a function for the generating the otp message
    function generateOTP() {
      // Generate a random 6-digit OTP
      let otpCode = "";
      for (let i = 0; i < 6; i++) {
        otpCode += Math.floor(Math.random() * 10);
      }
      //if somehow the otp doesn't generated then it will recall the function;
      if (otpCode === undefined) {
        generateOTP();
      }

      //returning the otp
      return otpCode;
    }

    // another function for generating the expriy time for the otp
    function generateOTPWithExpiry() {
      // Generate a random OTP with an expiration time of 5 minutes
      const otpCode = generateOTP(); //calling the otp generate function
      const expiryTime = Date.now() + 300000; // 5 minutes from now in milliseconds
      //returning the otp and its expiry time
      return { otpCode, expiryTime };
    }
    //destructring the otp code and its expiry time
    const { otpCode, expiryTime } = generateOTPWithExpiry();

    let optData = new OtpSchema({
      // creating new document in mongo db
      email: email, // user email sending
      code: otpCode, // saving the opt code to mongo db
      expireIn: new Date(expiryTime), // setting the  expiry time of the otp
    });

    let otpResponse = await optData.save(); // saving the document created above

    if (otpResponse) {
      res.status(201).json({ success: true, msg: "OTP GENERATED" }); // if document is generated then sending success
      await mailer(email, otpCode);
    } else {
      res.status(404).json({ success: false, msg: "OTP NOT FOUND" }); // any error ocuurs then it woll show this error
    }
  }
};

module.exports.addCategory = async (req, res, next) => {
  const { categoryTitle, categoryDescription, categoryLabel } = req.body;

  if (!categoryTitle || !categoryDescription || !categoryLabel) {
    return res.status(422).json({ error: "Please fill all the fields first" });
  } else {
    const category = new CategorySchema({
      categoryTitle,
      categoryDescription,
      categoryLabel,
    });
    const done = await category.save();

    if (done) {
      res.status(201).json({ success: true, msg: "Category Added" });
    } else {
      res.status(404).json({ success: false, msg: "Category Not Added" });
    }
  }
};

module.exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryTitle = req.params.categoryTitle;

    const category = await CategorySchema.findOneAndDelete({
      categoryTitle,
    });

    if (category) {
      res.status(201).json({ success: true, msg: "Category Deleted" });
    } else {
      res.status(404).json({ success: false, msg: "Category Not Deleted" });
    }
  } catch (error) {}
};

module.exports.teacherTokenData = async (req, res, next) => {
  const { token } = req.body;

  try {
    const teacher = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return "token Expired";
      }
      return data;
    });
    if (teacher === "token Expired") {
      return res.status(201).json({ status: false, data: "Token Expired !!" });
    } else {
      const teacherData = await TeacherSchema.findOne({
        _id: teacher.teacher._id,
      });
      res.status(201).json({ status: true, teacher: teacherData });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.studentTokenData = async (req, res, next) => {
  const { token } = req.body;

  try {
    const student = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return "token Expired";
      }
      return data;
    });
    if (student === "token Expired") {
      return res.status(201).json({ status: false, data: "Token Expired !!" });
    } else {
      const studentData = await StudentSchema.findOne({
        _id: student.student._id,
      });
      res.status(201).json({ status: true, student: studentData });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.checkTeacherPassword = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const teacher = await TeacherSchema.findOne({ email });

    const bytes = CryptoJS.AES.decrypt(
      teacher.password,
      process.env.CRYPTO_SECRET
    );
    const decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    if (teacher && password === decryptedPassword) {
      res.status(222).json({ success: true, msg: "Founded !!" });
    } else {
      res.status(444).json({ success: false, message: "ERROR" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "timeout", message: "Error Occured" });
  }
};

module.exports.checkStudentPassword = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const student = await StudentSchema.findOne({ email });

    const bytes = CryptoJS.AES.decrypt(
      student.password,
      process.env.CRYPTO_SECRET
    );
    const decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    if (student && password === decryptedPassword) {
      res.status(222).json({ success: true, msg: "Founded !!" });
    } else {
      res.status(444).json({ success: false, message: "ERROR" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "timeout", message: "Error Occured" });
  }
};

module.exports.updateTeacher = async (req, res, next) => {
  try {
    const { email, name, password, phone, gender } = req.body;

    if (!email || !password || !phone || !name || !gender) {
      res.status(400).json({ Error: "Please fill all fields" });
    }
    const teacher = await TeacherSchema.findOne({ email: email });

    if (teacher) {
      const encryptedPassword = CryptoJS.AES.encrypt(
        JSON.stringify(password),
        process.env.CRYPTO_SECRET
      ).toString();
      teacher.name = name;
      teacher.password = encryptedPassword;
      teacher.phone = phone;
      teacher.gender = gender;
      const done = await teacher.save();

      if (done) {
        res
          .status(201)
          .json({ success: true, message: "Successfully updated !!" });
      } else {
        res.status(404).json({ success: false, message: "Error updating !!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "Error updating !!" });
  }
};

module.exports.deleteTeacher = async (req, res, next) => {
  const { email } = req.body;

  const teacher = await TeacherSchema.findOne({ email });

  if (teacher) {
    const DelTeacher = await TeacherSchema.deleteOne({ email });
    if (DelTeacher) {
      res.status(200).json({ success: true, message: "Teacher Deleted" });
    } else {
      res.status(404).json({ success: false, message: "Teacher Not Deleted" });
    }
  } else {
    console.log(email);
    res.status(404).json({ success: false, message: "Teacher Not Found" });
  }
};

module.exports.updateStudent = async (req, res, next) => {
  try {
    const { email, name, password, phone, gender } = req.body;

    if (!email || !password || !phone || !name || !gender) {
      res.status(400).json({ Error: "Please fill all fields" });
    }
    const student = await StudentSchema.findOne({ email: email });

    if (student) {
      const encryptedPassword = CryptoJS.AES.encrypt(
        JSON.stringify(password),
        process.env.CRYPTO_SECRET
      ).toString();
      student.name = name;
      student.password = encryptedPassword;
      student.phone = phone;
      student.gender = gender;
      const done = await student.save();

      if (done) {
        res
          .status(201)
          .json({ success: true, message: "Successfully updated !!" });
      } else {
        res.status(404).json({ success: false, message: "Error updating !!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "Error updating !!" });
  }
};

module.exports.deleteStudent = async (req, res, next) => {
  const { email } = req.body;

  const student = await StudentSchema.findOne({ email });

  if (student) {
    const DelStudent = await StudentSchema.deleteOne({ email });
    if (DelStudent) {
      res.status(200).json({ success: true, message: "Student Deleted" });
    } else {
      res.status(404).json({ success: false, message: "Student Not Deleted" });
    }
  } else {
    console.log(email);
    res.status(404).json({ success: false, message: "Student Not Found" });
  }
};

module.exports.fetchAdminStudent = async (req, res, next) => {
  const data = await StudentSchema.find({});
  res.status(201).json(data);
};

module.exports.fetchAdminTeacher = async (req, res, next) => {
  const data = await TeacherSchema.find({});
  res.status(201).json(data);
};

module.exports.studentAdminDelete = async (req, res, next) => {
  try {
    const studentId = req.params.id;

    const student = await StudentSchema.findOne({ _id: studentId });

    if (student) {
      const deleteStudent = await StudentSchema.deleteOne({
        _id: studentId,
      });
      if (deleteStudent) {
        res.status(200).json({ success: true, message: "Student Deleted" });
      } else {
        res.status(404).json({ success: false, message: "Student Not Found" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.teacherAdminDelete = async (req, res, next) => {
  try {
    const teacherId = req.params.id;

    const teacher = await TeacherSchema.findOne({ _id: teacherId });

    if (teacher) {
      const deleteTeacher = await TeacherSchema.deleteOne({
        _id: teacherId,
      });
      if (deleteTeacher) {
        res.status(200).json({ success: true, message: "Teacher Deleted" });
      } else {
        res.status(404).json({ success: false, message: "Teacher Not Found" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};