const { User } = require("../models/user.model");
const { UserRole } = require("../models/userRole.model");
const { IdentificationType } = require("../models/identificationType.model");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../utils/firebase.util");
const { generateImgFirebase } = require("../utils/firebase.util");
const bcrypt = require("bcryptjs");
const { catchAsync } = require("../utils/catchAsync.util.js");
const { AppError } = require("../utils/appError.util");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });

  const postsWithImgsPromises = users.map(async (user) => {
    if (user.profilePicture) {
      const imgRef = ref(storage, user.profilePicture);
    const imgUrl = await getDownloadURL(imgRef);

    user.profilePicture = imgUrl;

    return user;
    }
    
  });

  await Promise.all(postsWithImgsPromises);

  res.status(200).json({
    status: "success",
    data: { users },
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const {
    name,
    lastName,
    identificationNumber,
    birthDate,
    gender,
    status,
    identificationTypeId,
    userRoleId,
    password,
  } = req.body;

  const role = await UserRole.findOne({ where: { id: userRoleId } });
  const identificationType = await IdentificationType.findOne({
    where: { id: identificationTypeId },
  });
  if (!role) {
    return next(new AppError("Error, role are not correct", 412));
  }
  if (!identificationType) {
    return next(
      new AppError("Error, the type of identification are not correct", 412)
    );
  }
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    lastName,
    identificationNumber,
    birthDate,
    gender,
    status,
    identificationTypeId,
    userRoleId,
    password: hashedPassword,
  });

  if (!newUser) {
    return next(new AppError("Error, User not create", 407));
  }

  res.status(200).json({
    status: "success"
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const {
    name,
    lastName,
    identificationNumber,
    birthDate,
    gender,
    identificationTypeId,
    userRoleId,
  } = req.body;
  const { userId } = req.params;

  const user = await User.findOne({ where: { id: userId, status: true } });

  if (!user) {
    return next(new AppError("Error, user not found or disabled", 407));
  }

  await user.update({
    name,
    lastName,
    identificationNumber,
    birthDate,
    gender,
    identificationTypeId,
    userRoleId,
  });

  res.status(200).json({
    status: "success"
  });
});

const disableAndEnableUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    return next(new AppError("Error, user not found", 404));
  }

  await user.update({
    status: !user.status,
  });

  res.status(200).json({
    status: "success",
  });
});

const createImgUser = async (req, res, next) => {
  const { sessionUser } = req;


  const result = generateImgFirebase(req.file,sessionUser.id);
 
  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
};
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  disableAndEnableUser,
  createImgUser,
};
