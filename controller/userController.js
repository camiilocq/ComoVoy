const User = require("../models/user");

/* finds all the users because a get method */
exports.findAll = (req, res, next) => {
  User.find({}, (err, user) => {
    if (err) return next(err);
    res.send(user);
  });
};

exports.findByEmailAndPassword = async (req, res, next) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    res.status(400).send("Username and password are required");
  }

  const userExist = await User.findOne({ correo });

  if (userExist && contrasena === userExist.contrasena) {
    const { id, nombre, contrasena, correo, promedioPonderado, institucion } =
      userExist;
    res.status(200).json({
      id,
      nombre,
      correo,
      promedioPonderado,
      institucion,
    });
  } else {
    res.status(400).send("invalid credentials");
  }
};

/* finds a user by their id because a get method with id as a parameter*/
exports.findbyId = (req, res, next) => {
  User.findOne({ id: req.params.userid }, (err, user) => {
    if (err) return next(res.status("405").send("the user doesn't exists"));
    res.send(user);
  });
};

/* creates a new user because a post method */
exports.create = async (req, res, next) => {
  const userExist = await User.findOne({ id: req.body.id });
  if (userExist) return res.status("409").send("the user already exists");

  //creates an user with the information given by the body of the post
  let user = new User({
    id: req.body.id,
    nombre: req.body.nombre,
    contrasena: req.body.contrasena,
    correo: req.body.correo,
    institucion: req.body.institucion,
    promedioPonderado: req.body.promedioPonderado,
  });

  //saves on the db the new user
  user.save((err) => {
    if (err) return next(err);
    res.send("User created succesfully");
  });
};

/* modify an user by their id*/
exports.update = async (req, res, next) => {
  User.findOneAndUpdate({ id: req.params.userid }, req.body, (err, user) => {
    if (err) return next(err);
    res.send(user.nombre + " was succesfully modified");
  });
};

/* deletes an user by their id because of a DELETE method */
exports.delete = (req, res, next) => {
  User.findOneAndDelete({ id: req.params.userid }, (err, user) => {
    if (err) return next(err);
    res.send(user.nombre + " was eliminated succesfully");
  });
};
