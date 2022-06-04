const buildErrorFieldRequired = field => {
  return `Le champ "${field}" est obligatoire`;
};

const buildErrorMessageFormat = field => {
  return `Le champ "${field}" est mal formaté`;
};

const errorHelper = { buildErrorFieldRequired, buildErrorMessageFormat };
export default errorHelper;
