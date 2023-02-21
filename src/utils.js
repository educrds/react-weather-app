const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

const weekDay = capitalizeFirstLetter(
  new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
  })
);
function getHourFromDate(datetime) {
  const time = datetime?.split(' ')[1]; // '22:11'
  const hour = time?.split(':')[0]; // '22'
  return hour;
}

export { weekDay, getHourFromDate };
