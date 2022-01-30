exports.getLogin = (req, res, next) => {
  res.render("user/login", {
    pageTitle: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  res.redirect("/");
};
