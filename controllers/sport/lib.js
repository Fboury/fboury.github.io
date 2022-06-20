const Sport = require("../../schema/schemaSport.js");

async function createSport(req, res) {
  const {
    titreSeance,
    typeSeance,
    duree,
    difficulte,
    dateSeance,
    meteo,
    sportifs
  } = req.body;
  if (
    !titreSeance ||
    !typeSeance ||
    !duree ||
    !difficulte ||
    !meteo ||
    !sportifs.length ||
    !dateSeance
  ) {
    //Le cas ou une donnée obligatoire ne serait pas soumise ou nulle
    return res.status(400).json({
      text: "Requête invalide, il manque des données obligatoires"
    });
  }
  // Création d'un objet sport
  const sport = {
    ...req.body
  };

  try {
    // Sauvegarde du sport en base
    const sportData = new Sport(sport);
    await sportData.save();

    return res.status(200).json({
      text: "Le sport a été créé avec succès",
      data: sportData
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function getSports(req, res) {
  try {
    const findSports = await Sport.find();
    console.log("findSports", findSports);

    if (!findSports || !findSports.length)
      return res.status(401).json({
        text: `Aucun sport`
      });

    return res.status(200).json({
      sports: findSports,
      text: "Récupération des sports réussie"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

async function deleteSport(req, res) {
  const { dateSeance, nomSport } = req.body;
  if (!anneeEnCours || !nomSport) {
    return res.status(400).json({
      text: "Requête invalide, il manque des informations obligatoires"
    });
  }
  try {
    const findSports = await Sport.findOneAndDelete({
      anneeEnCours,
      nomSport
    });

    if (!findSports || (findSports && Object.keys(findSports).length === 0))
      return res.status(401).json({
        text: `Aucun sport nommé ${nomSport} pour l'année ${anneeEnCours}`
      });
    return res.status(200).json({
      text: "Le sport a été supprimé avec succès"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

//On exporte nos deux fonctions

exports.getSports = getSports;
exports.createSport = createSport;
exports.deleteSport = deleteSport;
