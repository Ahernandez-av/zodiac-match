const express = require('express');
const router  = express.Router();
const uploadPicture = require('../configs/cloudinary');
const {
  createProfile, 
  processProfiles, 
  deleteAccount, 
  updateAccount, 
  updatedProfiles
}= require('../controllers/users')

router.get('/create-profile', createProfile)
router.post('/create-profile', uploadPicture.single('image'), processProfiles)
router.get('/update/:id',  updateAccount)
router.post('/update/:id', uploadPicture.single('image'), updatedProfiles)
router.get('/delete/:id',  deleteAccount)
module.exports= router;