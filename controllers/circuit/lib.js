const Circuit = require("../../schema/schemaCircuit.js");

async function createCircuit(req, res) {
  const {
    nomCircuit,
    paysCircuit,
    anneeEnCours,
    descriptionCircuit,
    typeCircuit
  } = req.body;
  if (
    !paysCircuit ||
    !nomCircuit ||
    !anneeEnCours ||
    !descriptionCircuit ||
    !typeCircuit
  ) {
    //Le cas ou une donnée obligatoire ne serait pas soumise ou nulle
    return res.status(400).json({
      text: "Requête invalide, il manque des données obligatoires"
    });
  }
  // Création d'un objet circuit
  const circuit = {
    ...req.body
  };

  // On check en base si le circuit existe déjà
  try {
    const findCircuit = await Circuit.findOne({
      nomCircuit,
      anneeEnCours
    });
    if (findCircuit) {
      return res.status(400).json({
        text: `Le circuit est déja créé pour l'année ${anneeEnCours}`
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  try {
    // Sauvegarde du circuit en base
    const circuitData = new Circuit(circuit);
    await circuitData.save();

    return res.status(200).json({
      text: "Le circuit a été créé avec succès",
      data: circuitData
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function getCircuits(req, res) {
  const { anneeEnCours } = req.body;
  if (!anneeEnCours) {
    return res.status(400).json({
      text: "Requête invalide, il faut envoyer l'année en cours"
    });
  }
  try {
    const findCircuits = await Circuit.find({ anneeEnCours });

    if (!findCircuits || !findCircuits.length)
      return res.status(401).json({
        text: `Aucun circuit pour l'année ${anneeEnCours}`
      });

    return res.status(200).json({
      circuits: findCircuits,
      anneeEnCours,
      text: "Récupération des circuits réussie"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

async function deleteCircuit(req, res) {
  const { anneeEnCours, nomCircuit } = req.body;
  if (!anneeEnCours || !nomCircuit) {
    return res.status(400).json({
      text: "Requête invalide, il manque des informations obligatoires"
    });
  }
  try {
    const findCircuits = await Circuit.findOneAndDelete({
      anneeEnCours,
      nomCircuit
    });

    if (
      !findCircuits ||
      (findCircuits && Object.keys(findCircuits).length === 0)
    )
      return res.status(401).json({
        text: `Aucun circuit nommé ${nomCircuit} pour l'année ${anneeEnCours}`
      });
    return res.status(200).json({
      text: "Le circuit a été supprimé avec succès"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

//On exporte nos deux fonctions

exports.getCircuits = getCircuits;
exports.createCircuit = createCircuit;
exports.deleteCircuit = deleteCircuit;
