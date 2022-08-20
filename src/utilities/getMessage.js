export const getMessage = async (url) => {
  try {
    const data = await fetch(url);
    const message = await data.json();
    const value = await message.value;
    return value;
  } catch (error) {
    throw new Error(error);
  }
};
