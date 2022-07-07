const express = require('express');
const upload = require('../middlewares/upload');

const houseController = require('../controllers/houseController');

const router = express.Router();

router.get('/user', houseController.getHouseByUserId);
// router.get("/limitHouse", houseController.getHouseByUserId);
router.get('/limitHouse/:id', houseController.getHouseLimit);
router.post(
  '/create',
  upload.fields([{ name: 'cover', maxCount: 7 }]),
  houseController.createHouse
);
router.patch('/update', houseController.updateHouse);
router.patch('/update/pin', houseController.updatePinHouse);
router.patch(
  '/update/image',
  upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'pic1', maxCount: 1 },
    { name: 'pic2', maxCount: 1 },
    { name: 'pic3', maxCount: 1 },
    { name: 'pic4', maxCount: 1 },
    { name: 'pic5', maxCount: 1 },
    { name: 'pic6', maxCount: 1 },
  ]),

  houseController.updateHouseImage
);
router.delete('/', houseController.deleteHouse);

module.exports = router;
