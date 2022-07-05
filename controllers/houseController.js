const {
  Province,
  District,
  SubDistrict,
  House,
  Filterdate,
} = require('../models');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

exports.getHouseByUserId = async (req, res, next) => {
  try {
    const { id } = req.user;

    const myHouse = await House.findOne({ where: { userId: id } });

    if (!myHouse) {
      createError('My House not found', 400);
    }

    res.status(200).json(myHouse);
  } catch (err) {
    next(err);
  }
};

exports.getHouseLimit = async (req, res, next) => {
  try {
    const d = new Date();

    const { id } = req.params;
    const limit = await Filterdate.findAll({
      where: { houseId: id, date: d.toISOString() },
    });

    res.status(200).json(limit);
  } catch (err) {
    next(err);
  }
};

exports.createHouse = async (req, res, next) => {
  try {
    const {
      name,
      type,
      petType,
      price,
      foodPrice,
      size,
      limit,
      checkInTime,
      checkOutTime,
      petFood,
      dailySchedule,
      other,
      isPetFood,
      isGrooming,
      isAirCondition,
      isPetStaff,
      isPetTraining,
      isPickupDropOff,
      isLitterChangedDaily,
      isAirFilter,
    } = req.body;

    let allPic = [];

    if (req?.files?.cover) {
      let coverRes;
      let res1;
      let res2;
      let res3;
      let res4;
      let res5;
      let res6;

      if (req?.files?.cover[0]) {
        coverRes = await cloudinary.upload(req.files.cover[0].path);
        allPic.push(coverRes.secure_url);
      }
      if (req?.files?.cover[1]) {
        res1 = await cloudinary.upload(req.files.cover[1].path);
        allPic.push(res1.secure_url);
      }
      if (req?.files?.cover[2]) {
        res2 = await cloudinary.upload(req.files.cover[2].path);
        allPic.push(res2.secure_url);
      }
      if (req?.files?.cover[3]) {
        res3 = await cloudinary.upload(req.files.cover[3].path);
        allPic.push(res3.secure_url);
      }
      if (req?.files?.cover[4]) {
        res4 = await cloudinary.upload(req.files.cover[4].path);
        allPic.push(res4.secure_url);
      }
      if (req?.files?.cover[5]) {
        res5 = await cloudinary.upload(req.files.cover[5].path);
        allPic.push(res5.secure_url);
      }
      if (req?.files?.cover[6]) {
        res6 = await cloudinary.upload(req.files.cover[6].path);
        allPic.push(res6.secure_url);
      }
    }

    const house = await House.create({
      userId: req.user.id,
      name,
      type,
      petType,
      price,
      foodPrice,
      size,
      limit,
      checkInTime,
      checkOutTime,
      petFood,
      dailySchedule,
      image: `[${allPic.map((el) => `"${el}"`)}]`,
      other,
      isPetFood,
      isGrooming,
      isAirCondition,
      isPetStaff,
      isPetTraining,
      isPickupDropOff,
      isLitterChangedDaily,
      isAirFilter,
    });
    res.status(201).json({ house });
  } catch (err) {
    next(err);
  } finally {
    if (req?.files?.cover) {
      if (req?.files?.cover[0]) {
        fs.unlinkSync(req.files.cover[0].path);
      }
      if (req?.files?.cover[1]) {
        fs.unlinkSync(req.files.cover[1].path);
      }
      if (req?.files?.cover[2]) {
        fs.unlinkSync(req.files.cover[2].path);
      }
      if (req?.files?.cover[3]) {
        fs.unlinkSync(req.files.cover[3].path);
      }
      if (req?.files?.cover[4]) {
        fs.unlinkSync(req.files.cover[4].path);
      }
      if (req?.files?.cover[5]) {
        fs.unlinkSync(req.files.cover[5].path);
      }
      if (req?.files?.cover[6]) {
        fs.unlinkSync(req.files.cover[6].path);
      }
    }
  }
};

exports.updateHouseImage = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      oldCover,
      oldPic1,
      oldPic2,
      oldPic3,
      oldPic4,
      oldPic5,
      oldPic6,
      deletePic,
    } = req.body;

    const myHouse = await House.findOne({ where: { userId: id } });

    if (!myHouse) {
      createError('house not found', 400);
    }

    const { image } = myHouse;

    const objImage = JSON.parse(image);

    if (oldPic6) {
      if (oldPic6 !== objImage[6]) {
        objImage[6] = oldPic6;
      }
    } else {
      if (objImage[6]) {
        objImage.splice(6, 1);
      }
    }

    if (oldPic5) {
      if (oldPic5 !== objImage[5]) {
        objImage[5] = oldPic5;
      }
    } else {
      if (objImage[5]) {
        objImage.splice(5, 1);
      }
    }

    if (oldPic4) {
      if (oldPic4 !== objImage[4]) {
        objImage[4] = oldPic4;
      }
    } else {
      if (objImage[4]) {
        objImage.splice(4, 1);
      }
    }

    if (oldPic3) {
      if (oldPic3 !== objImage[3]) {
        objImage[3] = oldPic3;
      }
    } else {
      if (objImage[3]) {
        objImage.splice(3, 1);
      }
    }

    if (oldPic2) {
      if (oldPic2 !== objImage[2]) {
        objImage[2] = oldPic2;
      }
    } else {
      if (objImage[2]) {
        objImage.splice(2, 1);
      }
    }

    if (oldPic1) {
      if (oldPic1 !== objImage[1]) {
        objImage[1] = oldPic1;
      }
    } else {
      if (objImage[1]) {
        objImage.splice(1, 1);
      }
    }

    if (oldCover) {
      if (oldCover !== objImage[0]) {
        objImage[0] = oldCover;
      }
    }

    if (deletePic) {
      deletePic.split(',').map(async (el) => {
        const splited = el.split('/');
        const publicId = splited[splited.length - 1].split('.')[0];
        await cloudinary.destroy(publicId);
      });
    }

    let allPic = [];

    if (req?.files) {
      let coverRes;
      let res1;
      let res2;
      let res3;
      let res4;
      let res5;
      let res6;

      if (req?.files?.cover) {
        if (req?.files?.cover[0] !== objImage[0]) {
          if (objImage[0]) {
            const splited = objImage[0].split('/');
            const publicId = splited[splited.length - 1].split('.')[0];
            await cloudinary.destroy(publicId);
          }
          coverRes = await cloudinary.upload(req.files.cover[0].path);
          allPic.push(coverRes.secure_url);
        } else {
          if (objImage[0]) {
            allPic.push(objImage[0]);
          }
        }
      } else {
        if (objImage[0]) {
          allPic.push(objImage[0]);
        }
      }

      if (req?.files?.pic1) {
        if (req?.files?.pic1[0] !== objImage[1]) {
          if (objImage[1]) {
            const splited = objImage[1].split('/');
            const publicId = splited[splited.length - 1].split('.')[0];
            await cloudinary.destroy(publicId);
          }
          res1 = await cloudinary.upload(req.files.pic1[0].path);
          allPic.push(res1.secure_url);
        } else {
          if (objImage[1]) {
            allPic.push(objImage[1]);
          }
        }
      } else {
        if (objImage[1]) {
          allPic.push(objImage[1]);
        }
      }

      if (req?.files?.pic2) {
        if (req?.files?.pic2[0] !== objImage[2]) {
          if (objImage[2]) {
            const splited = objImage[2].split('/');
            const publicId = splited[splited.length - 1].split('.')[0];
            await cloudinary.destroy(publicId);
          }
          res2 = await cloudinary.upload(req.files.pic2[0].path);
          allPic.push(res2.secure_url);
        } else {
          if (objImage[2]) {
            allPic.push(objImage[2]);
          }
        }
      } else {
        if (objImage[2]) {
          allPic.push(objImage[2]);
        }
      }

      if (req?.files?.pic3) {
        if (req?.files?.pic3[0] !== objImage[3]) {
          if (objImage[3]) {
            const splited = objImage[3].split('/');
            const publicId = splited[splited.length - 1].split('.')[0];
            await cloudinary.destroy(publicId);
          }
          res3 = await cloudinary.upload(req.files.pic3[0].path);
          allPic.push(res3.secure_url);
        } else {
          if (objImage[3]) {
            allPic.push(objImage[3]);
          }
        }
      } else {
        if (objImage[3]) {
          allPic.push(objImage[3]);
        }
      }

      if (req?.files?.pic4) {
        if (req?.files?.pic4[0] !== objImage[4]) {
          if (objImage[4]) {
            const splited = objImage[4].split('/');
            const publicId = splited[splited.length - 1].split('.')[0];
            await cloudinary.destroy(publicId);
          }
          res4 = await cloudinary.upload(req.files.pic4[0].path);
          allPic.push(res4.secure_url);
        } else {
          if (objImage[4]) {
            allPic.push(objImage[4]);
          }
        }
      } else {
        if (objImage[4]) {
          allPic.push(objImage[4]);
        }
      }

      if (req?.files?.pic5) {
        if (req?.files?.pic5[0] !== objImage[5]) {
          if (objImage[5]) {
            const splited = objImage[5].split('/');
            const publicId = splited[splited.length - 1].split('.')[0];
            await cloudinary.destroy(publicId);
          }
          res5 = await cloudinary.upload(req.files.pic5[0].path);
          allPic.push(res5.secure_url);
        } else {
          if (objImage[5]) {
            allPic.push(objImage[5]);
          }
        }
      } else {
        if (objImage[5]) {
          allPic.push(objImage[5]);
        }
      }

      if (req?.files?.pic6) {
        if (req?.files?.pic6[0] !== objImage[6]) {
          if (objImage[6]) {
            const splited = objImage[6].split('/');
            const publicId = splited[splited.length - 1].split('.')[0];
            await cloudinary.destroy(publicId);
          }
          res6 = await cloudinary.upload(req.files.pic6[0].path);
          allPic.push(res6.secure_url);
        } else {
          if (objImage[6]) {
            allPic.push(objImage[6]);
          }
        }
      } else {
        if (objImage[6]) {
          allPic.push(objImage[6]);
        }
      }

      myHouse.image = `[${allPic.map((el) => `"${el}"`)}]`;
    } else {
      myHouse.image = `[${objImage.map((el) => `"${el}"`)}]`;
    }

    await myHouse.save();

    res.json({ myHouse });
  } catch (err) {
    next(err);
  } finally {
    if (req?.files) {
      if (req?.files?.cover) {
        fs.unlinkSync(req.files.cover[0].path);
      }
      if (req?.files?.pic1) {
        fs.unlinkSync(req.files.pic1[0].path);
      }
      if (req?.files?.pic2) {
        fs.unlinkSync(req.files.pic2[0].path);
      }
      if (req?.files?.pic3) {
        fs.unlinkSync(req.files.pic3[0].path);
      }
      if (req?.files?.pic4) {
        fs.unlinkSync(req.files.pic4[0].path);
      }
      if (req?.files?.pic5) {
        fs.unlinkSync(req.files.pic5[0].path);
      }
      if (req?.files?.pic6) {
        fs.unlinkSync(req.files.pic6[0].path);
      }
    }
  }
};

exports.updateHouse = async (req, res, next) => {
  try {
    // const { id } = req.params;
    const {
      id,
      name,
      type,
      petType,
      price,
      foodPrice,
      size,
      limit,
      checkInTime,
      checkOutTime,
      petFood,
      dailySchedule,
      other,
      isPetFood,
      isGrooming,
      isAirCondition,
      isPetStaff,
      isPetTraining,
      isPickupDropOff,
      isLitterChangedDaily,
      isAirFilter,
      status,
    } = req.body;

    console.log(req.body);

    const findHouseId = await House.findOne({ where: { id } });
    console.log(findHouseId);

    if (!findHouseId) {
      createError(404, 'House not found');
    }

    const updateValue = await House.update(
      {
        name,
        type,
        petType,
        price,
        foodPrice,
        size,
        limit,
        checkInTime,
        checkOutTime,
        petFood,
        dailySchedule,
        other,
        isPetFood,
        isGrooming,
        isAirCondition,
        isPetStaff,
        isPetTraining,
        isPickupDropOff,
        isLitterChangedDaily,
        isAirFilter,
        status,
      },
      { where: { id: findHouseId.id } }
    );

    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
exports.deleteHouse = async (req, res, next) => {
  try {
    const { test } = req.body;
    res.status(200).json({ test });
  } catch (err) {
    next(err);
  }
};
