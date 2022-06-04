const User = require("../../schema/schemaUser.js");
const passwordHash = require("password-hash");

async function signup(req, res) {
  const { password, email } = req.body;
  if (!email || !password) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Requête invalide, il manque des informations"
    });
  }

  // Création d'un objet user, dans lequel on hash le mot de passe
  const user = {
    ...req.body,
    email,
    password: passwordHash.generate(password)
  };
  // On check en base si l'utilisateur existe déjà
  try {
    const findUser = await User.findOne({
      email
    });
    if (findUser) {
      return res.status(400).json({
        text: "Un utilisateur existe déjà avec cette adresse email"
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  try {
    // Sauvegarde de l'utilisateur en base
    const userData = new User(user);
    const userObject = await userData.save();
    return res.status(200).json({
      text: "L'utilisateur a été créé avec succès",
      user: userObject,
      token: userObject.getToken()
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function login(req, res) {
  const { password, email } = req.body;
  if (!email || !password) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Requête invalide, il manque des informations obligatoires"
    });
  }
  try {
    // On check si l'utilisateur existe en base
    const findUser = await User.findOne({ email });

    if (!findUser)
      return res.status(401).json({
        text: "L'utilisateur n'existe pas"
      });
    if (!findUser.authenticate(password))
      return res.status(401).json({
        text: "Mot de passe incorrect"
      });
    return res.status(200).json({
      token: findUser.getToken(),
      id: findUser._id,
      text: "Authentification réussie"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

async function getUsers(req, res) {
  try {
    const findUsers = await User.find();

    if (!findUsers || !findUsers.length)
      return res.status(401).json({
        text: "Aucun user enregistré"
      });

    return res.status(200).json({
      users: findUsers,
      text: "Récupération réussie"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

async function getUser(req, res) {
  const { idUser } = req.body;
  if (!idUser) {
    return res.status(400).json({
      text: "Requête invalide, il faut envoyer l'id de l'utilisateur"
    });
  }
  try {
    const findUser = await User.findOne({ _id: idUser });

    if (!findUser)
      return res.status(401).json({
        text: `Aucun utilisateur enregistré avec l'id ${idUser}`
      });

    return res.status(200).json({
      user: findUser,
      text: "Récupération réussie"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

async function deleteUser(req, res) {
  const { idUser } = req.body;

  if (!idUser) {
    return res.status(400).json({
      text: "Requête invalide, il manque l'id de l'utilisateur"
    });
  }
  try {
    const findUsers = await User.findOneAndDelete({ _id: idUser });

    if (!findUsers)
      return res.status(401).json({
        text: `Aucun utilisateur avec l'id ${idUser}`
      });

    return res.status(200).json({
      text: "L'utilisateur a été supprimé avec succès"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

async function updateDroitsUser(req, res) {
  const { _id, droitsCreation, droitsEdition } = req.body;
  if (!_id || droitsCreation === undefined || droitsEdition === undefined) {
    return res.status(400).json({
      text: "Requête invalide, il manque des infos obligatoires"
    });
  }
  try {
    const findUser = await User.findOneAndUpdate(
      { _id },
      { droitsCreation, droitsEdition }
    );

    if (!findUser)
      return res.status(401).json({
        text: `Aucun utilisateur avec l'id ${_id}`
      });

    return res.status(200).json({
      text: "Les droits de l'utilisateur ont été modifiés avec succès",
      user: req.body
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}
//On exporte nos fonctions

exports.login = login;
exports.signup = signup;
exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
exports.getUser = getUser;
exports.updateDroitsUser = updateDroitsUser;
