import { readById } from "../dao/mongo/managers/users.manager.js";

function register(req, res, next) {
  const { _id } = req.user;
  const message = "User Registered!";
  return res.json201(_id, message);
}
function login(req, res, next) {
  const { token } = req.user;
  const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
  const message = "User logged in!";
  const response = "OK";
  return res.cookie("token", token, opts).json200(response, message);
}
function signout(req, res, next) {
  const message = "User signed out!";
  const response = "OK";
  return res.clearCookie("token").json200(response, message);
}
function google(req, res, next) {
  //const { token } = req.user;
  //const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
  const message = "Google User logged in!";
  const response = "OK";
  return res.json200(response, message);
  //return res.cookie("token", token, opts).json200(response, message);
  //return res.status(200).json({ message: "GOOGLE USER LOGGED IN", token: req.token });
}
async function online(req, res, next) {
  return res.status(200).json({
    message: req.user.email.toUpperCase() + " IS ONLINE",
    online: true,
  });
}

export { register, login, signout, google, online }