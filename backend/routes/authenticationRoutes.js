const express = require("express");
const {loginAuthority, loginHospital, loginPatient, signinAuthority,getUser}=require("../controllers/AuthControllers")
const {verifyToken}=require('../middlewares/verifytoken')
const router = express.Router();

// Authority Signup
router.post("/signup", signinAuthority);

// Authority Login
router.post("/authority", loginAuthority);
    
// Hospital Login
router.post("/hospital", loginHospital);

// Patient Login
router.post("/patient", loginPatient);

router.get('/user-type',verifyToken,getUser)


module.exports = router;
