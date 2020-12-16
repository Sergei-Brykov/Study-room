const express = require("express")
const { Router } = require("express")
const router = Router()

const sendCandidateEmail = require('../controllers/sendCandidateMail')
const completeInvitation = require('../controllers/completeInvitation')
const completeRecover = require('../controllers/completeRecover')
const getAllInvintation = require('../controllers/getAllInvintation')
const getAllUsers = require('../controllers/getAllUsers')

const {setAvatar, setName, getAvatar, getName} = require('../controllers/setAvatar')
const signInUser = require('../controllers/signInUser')
const {blockUser, unblockUser} = require('../controllers/blockUser')
const { inviteUser, sendLinkToRecoverPassword } = require('../controllers/inviteUser')
const checkHash = require('../middlewares/checkHash')
const validatePassword = require('../middlewares/validatePassword')
const validateEmail = require('../middlewares/validateEmail')
const validateUser = require('../middlewares/validateUser')
const {authUser, authAdmin} = require('../middlewares/authUser')
const { setFacebookAuth,  setGoogleAuth, googleSingIn, facebookSingIn } = require('../controllers/oAuth')
router.use(express.json({ extendet: true }))
var multer  = require('multer')
var upload = multer({ dest: 'client/build/static/avatars/' })

router.use('/check', checkHash)
router.post('/check/invitation', sendCandidateEmail)
router.post('/check/recover', sendCandidateEmail)

router.post('/complete-invitation', checkHash, validatePassword, completeInvitation)
router.post('/complete-recover', checkHash, validatePassword, completeRecover)

router.post('/forgot-password', validateEmail, sendLinkToRecoverPassword)
router.post('/invite', validateEmail, authUser, inviteUser)
router.post('/facebooktoken', authUser,  setFacebookAuth)
router.post('/googletoken', authUser,  setGoogleAuth)

router.post('/block-user', authUser, authAdmin, blockUser)
router.post('/unblock-user', authUser, authAdmin, unblockUser)

// /api/set-avatar
router.post('/set-avatar', authUser, upload.single('avatar'), setAvatar)

router.get('/get-all-invintation', authUser, authAdmin, getAllInvintation)
router.get('/get-all-users', authUser, authAdmin, getAllUsers)
router.get('/get-avatar', authUser, getAvatar)
router.get('/get-name', authUser, getName)

router.post('/login', validateEmail, validatePassword, signInUser)
router.post('/oauth-facebook-login', facebookSingIn)
router.post('/oauth-google-login', googleSingIn)

module.exports = router




