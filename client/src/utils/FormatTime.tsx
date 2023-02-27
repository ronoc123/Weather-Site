const formatTime = (value: number) => {
  const dt = value;
  const date = new Date(dt * 1000);
  const formattedTime = date.toLocaleTimeString();
  return formattedTime;
};

export default formatTime;
