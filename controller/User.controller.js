const User = require('../model/user');
const UserConfig = require('../model/user_config');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const axios = require('axios');
const Ads_Info = require('../model/Ads_Info');

//!Register new user and create user config
exports.create = (req, res) => {
    User.getByEmail(req.body.email).then(success => {
        if (success.length != 0) {
            res.status(400).json({
                status: 400,
                error: "email already exists!",
                response: null
            });
            return;
        }
        bcryptjs.genSalt(8, function (err, salt) {
            bcryptjs.hash(req.body.password, salt, function (err, hash) {
                const newUser = {
                    "first_name": req.body.first_name,
                    "last_name": req.body.last_name,
                    "tel_number": req.body.tel_number,
                    "email": req.body.email,
                    "reg_date": new Date(),
                    "password": hash,
                    "type": req.body.type,
                };
                User.create(newUser).then(success1 => {
                    return UserConfig.create(success1.insertId).then(success => {
                        res.status(200).json({
                            status: 200,
                            error: null,
                            response: success1.insertId
                        });
                    });
                }).catch(error => {
                    res.status(400).json({
                        status: 400,
                        error: error,
                        response: null
                    })
                });
            });
        });
    }).catch(error => {
        res.status(400).json({
            status: 400,
            error: error,
            response: null
        })
    })
};

//!Send OTP
exports.sendOTP = (req, res) => {
    var secret = speakeasy.generateSecret();
    var otp = speakeasy.totp({
        secret: secret.base32,
        encoding: "base32"
    });
    var data = {
        secret: otp,
        uid: req.body.uid,
        phone_number: req.body.phone_number,
        updateTime: new Date()
    };
    console.log(data);
    
    User.updateSecret(data).then(success1 => {
        var otp = speakeasy.totp({
            secret: secret.base32,
            encoding: "base32"
        });
        var msg = otp + " is your one time password(OTP) for phone verification " + req.body.signature;
        return axios.get(`https://richcommunication.dialog.lk/api/sms/inline/send?q=49237d4f26e997e&destination=${req.body.phone_number}&message=${msg}&from=LYF`).then(success2 => {
            res.status(200).json({
                status: 200,
                response: "success",
                error: null
            })
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            response: null,
            error: e
        })
    })
}

//!Verify OTP
exports.verfyOTP = (req, res) => {
    User.getSecret(req.body.uid).then(success1 => {
        var data = {
            secret: null,
            uid: req.body.uid,
            phone_number: req.body.phone_number,
            updateTime: new Date()
        };
        var isValid = success1[0].user_secret == req.body.otp
        if (isValid) {
            return User.updateSecret(data).then(success2 => {
                return User.verify(req.body.uid).then(success3 => {
                    res.status(200).json({
                        status: 200,
                        response: "OTP validate!",
                        error: null
                    })
                }).catch(e => {
                    res.status(400).json({
                        status: 400,
                        response: null,
                        error: e
                    })
                })
            })
        } else {
            res.status(400).json({
                status: 400,
                response: null,
                error: "Failed OTP validate!"
            })
        }
    })
}

//!Login User
exports.login = (req, res) => {
    User.getByEmail(req.body.email,req.body.user_type).then(success => {
        if (success.length == 0) {
            res.status(400).json({
                status: 400,
                msg: "User doesn't exist. Please register first.",
                response: null
            });
        } else {
            var user = {
                "id": success[0].id_user,
                "email": success[0].email_address,
                "password": success[0].password
            }
            bcryptjs.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, 'secret', function (err, token) {
                        User.login('Email', user.id).then(success2 => {
                            res.status(200).json({
                                status: 200,
                                error: null,
                                response: success[0],
                                token: token
                            })
                        }).catch(error => {
                            res.status(400).json({
                                status: 400,
                                error: error,
                                response: null
                            });
                        });
                    })
                } else {
                    res.status(400).json({
                        status: 400,
                        response: null,
                        msg: "Password incorrect!",
                        token: null
                    })
                }
            });
        }
    }).catch(error => {
        res.status(400).json({
            status: 400,
            error: error,
            response: null
        });
    });
}

//!Login with google
exports.loginWithGoogle = (req, res) => {
    User.getByEmail(req.body.email).then(success => {
        if (success.length != 0) {
            const token = jwt.sign({
                email: req.body.email,
                userId: success[0].id_user
            }, 'secret', function (err, token) {
                User.login('Google', success[0].id_user).then(success2 => {
                    res.status(200).json({
                        status: 200,
                        error: null,
                        response: success[0],
                        token: token
                    })
                }).catch(error => {
                    res.status(400).json({
                        status: 400,
                        error: error,
                        response: null
                    });
                });
            })
            return;
        }
        const newUser = {
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "tel_number": req.body.tel_number,
            "email": req.body.email,
            "reg_date": new Date(),
            "password": '',
            "type": req.body.type,
        };
        User.create(newUser).then(success1 => {
            return UserConfig.create(success1.insertId).then(success => {
                const token = jwt.sign({
                    email: req.body.email,
                    userId: success1.insertId
                }, 'secret', function (err, token) {
                    User.login('Google', success1.insertId).then(success2 => {
                        return User.getByEmail(req.body.email).then(success3 => {
                            res.status(200).json({
                                status: 200,
                                error: null,
                                response: success3[0],
                                token: token
                            })
                        })
                    }).catch(error => {
                        res.status(400).json({
                            status: 400,
                            error: error,
                            response: null
                        });
                    });
                })
                return;
            });
        }).catch(error => {
            res.status(400).json({
                status: 400,
                error: error,
                response: null
            })
        });
    })
}

//!Update user info
exports.update = (req, res) => {
    var updateTime = new Date();
    const updateUser = {
        "uid": req.body.uid,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "tel_number": req.body.tel_number,
        "email": req.body.email,
        "description": req.body.description,
        "updated_at": updateTime,
        "location": req.body.location,
        "address": req.body.address
    };

    User.update(updateUser).then(success => {
        return User.getUserInfo(req.body.uid).then(success => {
            res.status(200).json({
                status: 200,
                error: null,
                response: success
            })
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
};

//!Deactivate user account
exports.deactivate = (req, res) => {
    var removeTime = new Date();
    User.deactivate(removeTime, req.body.uid).then(success => {
        res.status(200).json({
            status: 200,
            error: null,
            response: "User account deactivated successful!"
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!Logout user
exports.logout = (req, res) => {
    var removeTime = new Date();
    User.logout(removeTime, req.body.uid).then(success => {
        res.status(200).json({
            status: 200,
            error: null,
            response: "User logout successful!"
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!Get user info and config info by uid
exports.getUserInfo = (req, res) => {
    User.getUserInfo(req.body.uid).then(success => {
        if (success.length == 0) {
            res.status(400).json({
                status: 400,
                error: "The user in not exists or deactivate",
                response: null
            })
            return;
        }
        res.status(200).json({
            status: 200,
            error: null,
            response: success
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//! Get all users
exports.getAllUsers = (req, res) => {
    User.getAllUsers().then(async success1 => {
        var allUsers = [];
        for (let i = 0; i < success1.length; i++) {
            var data = {
                uid: success1[i].id_user
            }
            var response = await Ads_Info.getAdsCountByUid(data);
            allUsers.push({
                ...success1[i],
                ads_count: response[0]["COUNT(*)"],
            })
        }
        res.status(200).json({
            status: 200,
            error: null,
            response: allUsers
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
};

//! Reset password
exports.resetPassword = (req, res) => {
    User.getUserInfo(req.body.uid).then(success => {
        if (success.length == 0) {
            return res.status(400).json({
                status: 400,
                error: 'Account does not exist!',
                response: null
            })
        }
        bcryptjs.compare(req.body.oldPassword, success[0].password, function (err, result) {
            if (result) {
                bcryptjs.genSalt(8, function (err, salt) {
                    bcryptjs.hash(req.body.newPassword, salt, function (err, hash) {
                        User.resetPassword(hash, req.body.uid).then(success => {
                            res.status(200).json({
                                status: 200,
                                error: null,
                                response: "Password reset successful!"
                            })
                        }).catch(e => {
                            res.status(400).json({
                                status: 400,
                                error: 'll',
                                response: null
                            })
                        })
                    })
                })
            } else {
                res.status(400).json({
                    status: 400,
                    error: "unable update.password not match",
                    response: null
                })
            }
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//!Forgot password(Add new one)
exports.forgetPassword = (req, res) => {
    bcryptjs.genSalt(8, function (err, salt) {
        bcryptjs.hash(req.body.newPassword, salt, function (err, hash) {
            User.resetPassword(hash, req.body.uid).then(success => {
                res.status(200).json({
                    status: 200,
                    error: null,
                    response: "Password reset successful!"
                })
            }).catch(e => {
                res.status(400).json({
                    status: 400,
                    error: e,
                    response: null
                })
            })
        })
    })
}

//!Check selected account valid or not
exports.checkSelectedAccounttValidOrNot = (req, res) => {
    User.checkSelectedAccountValidOrNot(req.body.email).then(success => {
        if (success.length == 0) {
            return res.status(400).json({
                status: 400,
                error: 'Account is not exists!',
                response: null
            })
        }
        res.status(200).json({
            status: 200,
            error: null,
            response: success
        })
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    })
}

//! Add user follow info (follow or unfollow)
exports.addFollowState = (req, res) => {
    var data = {
        "uid": req.body.uid,
        "followerId": req.body.followerId
    }
    User.checkFollow(data).then(sucess1 => {
        if (sucess1) {
            return User.addFollowState(data, sucess1).then(success2 => {
                return res.status(200).json({
                    status: 200,
                    error: null,
                    response: "User Unfollowed successful!"
                }).catch(e => {
                    res.status(400).json({
                        status: 400,
                        error: e,
                        response: null
                    })
                });
            })
        } else {
            return User.addFollowState(data, sucess1).then(success2 => {
                return res.status(200).json({
                    status: 200,
                    error: null,
                    response: "User followed successful!"
                }).catch(e => {
                    res.status(400).json({
                        status: 400,
                        error: e,
                        response: null
                    })
                });
            })
        }
    })
}

//! Check selected profile follow or not
exports.checkSelectedAccountFollowOrNot = (req, res) => {
    var data = {
        uid: req.body.uid,
        followerId: req.body.followerId
    }
    User.checkSelectedAccountFollowOrNot(data).then(success => {
        return res.json({
            status: 200,
            error: null,
            response: {
                isfollow: success
            }
        });
    }).catch(e => {
        res.status(400).json({
            status: 400,
            error: e,
            response: null
        })
    });
}

//!Update profile photo
exports.updateProfilePhoto = (req, res) => {
    User.uploadProfilePhoto(req, res, err => {
        if (err) {
            return res.json({
                status: 400,
                error: err,
                response: null
            })
        }
        var data = {
            url: res.req.file.path,
            uid: req.query.uid,
            updated_at: new Date()
        }
        User.updateProfilePhoto(data, function (err1, res2) {
            if (err1) {
                return res.status(400).json({
                    status: 400,
                    error: err1,
                    response: null
                })
            } else {
                return res.json({
                    status: 200,
                    error: null,
                    response: data.url
                });
            }
        });
    })
}

//!Update cover photo
exports.updateCoverPhoto = (req, res) => {
    User.uploadCoverPhoto(req, res, err => {
        if (err) {
            return res.status(400).json({
                status: 400,
                error: err,
                response: null
            })
        }
        var data = {
            url: res.req.file.path,
            uid: req.query.uid,
            updated_at: new Date()
        }
        User.updateCoverPhoto(data, function (err1, res2) {
            if (err1) {
                return res.status(400).json({
                    status: 400,
                    error: err1,
                    response: null
                })
            } else {
                return res.status(200).json({
                    status: 200,
                    error: null,
                    response: data.url
                });
            }
        });
    })
}

