var express = require("express");
var router = express.Router();
const User = require("../models/user");
const upload = require("../middleware/upload");
const { authenticate } = require("../middleware/auth");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const users = await User.findAll();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk mengunggah gambar profil
router.post(
  "/uploadProfilePic",
  authenticate,
  upload.single("profilePic"),
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.profilePic = req.file.path; // Simpan path gambar ke database
      await user.save();
      res.json({
        message: "Profile picture uploaded successfully",
        filePath: req.file.path,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Endpoint untuk update data pengguna berdasarkan ID
router.put("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  try {
    // Cari user berdasarkan ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update data pengguna
    user.username = req.body.username;
    user.password = req.body.password;
    user.role = req.body.role;

    // Simpan perubahan ke database
    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (err) {
    next(err);
  }

  // Endpoint untuk mengunggah gambar profil
  router.post(
    "/uploadProfilePic",
    authenticate,
    upload.single("profilePic"),
    async (req, res, next) => {
      try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        user.profilePic = req.file.path; // Simpan path gambar ke database
        await user.save();
        res.json({
          message: "Profile picture uploaded successfully",
          filePath: req.file.path,
        });
      } catch (err) {
        next(err);
      }
    }
  );
});

module.exports = router;
