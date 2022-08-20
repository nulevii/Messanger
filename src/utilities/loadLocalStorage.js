export const loadLocalStorage = (localStorageObjectName, objectToload) => {
  const existingObject = localStorage.getItem(localStorageObjectName);
  if (!existingObject) {
    localStorage.setItem(
      localStorageObjectName,
      JSON.stringify(objectToload),
    );
  }
  const localStorageElement = localStorage.getItem(localStorageObjectName);
  return JSON.parse(localStorageElement);
};
