const generateArrayOfYears = () => {
  var max = new Date().getFullYear();
  var min = max - 9;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push({ value: i, label: i });
  }
  return years;
};

const configHelper = {
  generateArrayOfYears
};

export default configHelper;
