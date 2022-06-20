const buildAddMessage = location => {
  switch (location) {
    case "/sports":
      return "Ajouter une activité";
    case "/livres":
      return "Ajouter un livre";
    case "/vacances":
      return "Ajouter un voyage";
    case "/projets":
      return "Ajouter un projet";
    default:
      return "";
  }
};

const navHelper = { buildAddMessage };
export default navHelper;
