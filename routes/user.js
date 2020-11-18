const express = require('express');
const router  = express.Router();
const {dashi,createProfile, processProfiles, profileDash, deleteAccount, updateAccount, updatedProfiles}= require('../controllers/users')
const uploadPicture = require('../configs/cloudinary');

const first=require('../middlewares/first')

router.get('/dashboard', first, profileDash)
router.get('/create-profile', createProfile)
router.post('/create-profile', uploadPicture.single('image'), processProfiles)


router.get('/update/:id',  updateAccount)
router.post('/update/:id', uploadPicture.single('image'), updatedProfiles)
router.get('/delete/:id',  deleteAccount)

module.exports= router;
