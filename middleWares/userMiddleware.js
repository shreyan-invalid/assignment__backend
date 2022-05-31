const { roles } = require("../Utils/roles");

const grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.data.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

const allowIfLoggedin = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to access this route",
      });
    next();
  } catch (error) {
    next(error);
  }
};



module.exports = {
  allowIfLoggedin,
  grantAccess,
};
