const { initializeApp } = require("firebase/app");
const { getStorage ,ref, uploadBytes  } = require("firebase/storage");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const {User} = require("../models/user.model")

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const generateImgFirebase = async (img, userId) => {

  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    return next(new AppError("Error, user not found or disabled", 407));

  }
  const [originalName, ext] = img.originalname.split(".");

  const filename = `img/${user.id}/${originalName}-${Date.now()}.${ext}`;

  const imgRef = ref(storage, filename);

  const result = await uploadBytes(imgRef, img.buffer);

  await user.update({ profilePicture: result.metadata.fullPath});

  return user;
};


module.exports = { storage, generateImgFirebase };
