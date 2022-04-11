const sql = require('../utill/database');
const multer = require("multer");

const User = function () {
};

//!Create user
User.create = (newUser) => {
  return new Promise((resolve, reject) => {
    sql.query(`INSERT INTO user (f_name, l_name, tel_number, email_address, reg_date, password, type) 
      VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [newUser.first_name, newUser.last_name, newUser.tel_number, newUser.email, newUser.reg_date, newUser.password, newUser.type],
      (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
  });
};

//!Login User 
User.login = (login_method, uid) => {
  return new Promise((resolve, reject) => {
    sql.query("UPDATE user SET status=1, login_method=? WHERE id_user = ?;",
      [login_method, uid],
      function (err, success) {
        if (err) {
          reject(err);
        } else {
          resolve(success);
        }
      }
      )
  })
}

//!Update OTP user secret
User.updateSecret = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`UPDATE user SET user_secret=?, update_at=? ,tel_number=? WHERE id_user=?;`,
      [data.secret, data.updateTime, data.phone_number, data.uid],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      )
  })
}

//!Get OTP user secret
User.getSecret = (uid) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT u.user_secret FROM user As u WHERE u.id_user=?;`,
      [uid],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
      )
  })
}

//!Verify user
User.verify = (uid) => {
  return new Promise((resolve, reject) => {
    sql.query("UPDATE user SET status=1 WHERE id_user = ?;",
      [uid],
      function (err, success) {
        if (err) {
          reject(err);
        } else {
          resolve(success);
        }
      }
      )
  })
}

//!Get user by email
User.getByEmail = (email,utype) => {

  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM user AS u WHERE u.email_address=? AND status = 1 AND type=?`,
      [email,utype],
      (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
  });
}

//!Update user info
User.update = (updateUser) => {
  return new Promise((resolve, reject) => {
    sql.query("UPDATE user SET f_name= ?, l_name= ?, tel_number = ?, email_address = ?, address=?, description = ?, update_at =? WHERE id_user = ?;",
      [updateUser.first_name, updateUser.last_name, updateUser.tel_number, updateUser.email, updateUser.location, updateUser.description, updateUser.updated_at, updateUser.uid],
      function (err, success) {
        if (err) {
          reject(err);
        } else {
          resolve(success);
        }
      }
      )
  })
}

//! Deactivate user account
User.deactivate = (removedTime, uid) => {
  return new Promise((resolve, reject) => {
    sql.query('UPDATE user SET status=0, remove_at=? WHERE id_user=?', [removedTime, uid], function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  })
}

//! Logout user 
User.logout = (removedTime, uid) => {
  return new Promise((resolve, reject) => {
    sql.query('UPDATE user SET status=2, remove_at=? WHERE id_user=?', [removedTime, uid], function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  })
}

//!Get user info and config info by uid
User.getUserInfo = (uid) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT u.*,uc.* FROM user As u INNER JOIN userconfig As uc On u.id_user=uc.id_user WHERE u.id_user=? and  (u.status = '1' OR u.status=2)",
    // sql.query("SELECT u.*,uc.*,fu.user_id as currentuser, fu.follower_id as followuser FROM user AS u INNER JOIN userconfig AS uc ON (u.id_user = uc.id_user) LEFT JOIN follow_has_userid as fu ON (fu.user_id = u.id_user) WHERE u.id_user = 2 AND(u.status = '1' OR u.status = 2)",
      [uid],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  })
};

//!Get all users
User.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    sql.query("select * from user", [], function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  })
}

//! Reset password
User.resetPassword = (newPassword, uid) => {
  return new Promise((resolve, reject) => {
    sql.query("update user set password =? where id_user=?;", [newPassword, uid],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res)
        }
      });
  })
}

//!Check selected account valid or not
User.checkSelectedAccountValidOrNot = (email)=>{
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM user WHERE email_address=?", [email],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res)
        }
      });
  })
}

//! Add user follower info (Follow or Unfollow)
User.addFollowState = (data, isFollow) => {
  return new Promise((resolve, reject) => {
    var query = `INSERT INTO follow_has_userid (user_id, follower_id) VALUES (?, ?);`;
    if (isFollow) {
      query = `DELETE FROM follow_has_userid WHERE user_id=? AND follower_id=?;`;
    }
    sql.query(query, [data.uid, data.followerId], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  })
}

//! Check selected profile follow or not
User.checkSelectedAccountFollowOrNot = (data) => {
  return new Promise((resolve, reject) => {
    sql.query("select * from follow_has_userid where 	user_id =? AND 	follower_id=?",
      [data.uid, data.followerId], function (err, res) {
        if (err) {
          reject(err);
        } else if (res.length == 0) {
          resolve(false);
        } else {
          resolve(true)
        }
      });
  })
}

//!Get follow info by uid and follower id
User.checkFollow = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM follow_has_userid As fh WHERE fh.user_id=? AND fh.follower_id=?;`,
      [data.uid, data.followerId], function (err, res) {
        if (err) {
          reject(err);
        } else if (res.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
  })
}

//!Upload profile photo
var storageProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/user/profilePhoto/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname)
  //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
  //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
  //   }
  //   cb(null, true)
  // }
})
User.uploadProfilePhoto = multer({ storage: storageProfile }).single("file");
User.updateProfilePhoto = (data, result) => {
  sql.query('UPDATE user SET profile_url=?, update_at=? WHERE id_user=?', [data.url, data.updated_at, data.uid], function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

//!Upload cover photo
var storageCover = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/user/coverPhoto/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname)
  //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
  //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
  //   }
  //   cb(null, true)
  // }
})

User.uploadCoverPhoto = multer({ storage: storageCover }).single("file");
User.updateCoverPhoto = (data, result) => {
  sql.query('UPDATE user SET cover_Url=?, update_at=? WHERE id_user=?', [data.url, data.updated_at, data.uid], function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

//!Get followers count by uid
User.getFollowersCountByUid = (data) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT COUNT(*) FROM follow_has_userid AS f WHERE f.user_id=? `,
      [data.uid], function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
  })
}


module.exports = User;

