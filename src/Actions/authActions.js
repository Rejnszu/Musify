export const getUsersFromDatabase = async () => {
  const response = await fetch(
    `https://musify-98a44-default-rtdb.firebaseio.com/users.json`
  );
  const data = await response.json();
  return data;
};
export const sendUserToDatabase = async (users) => {
  const response = await fetch(
    `https://musify-98a44-default-rtdb.firebaseio.com/users.json`,
    {
      method: "PUT",
      body: JSON.stringify(users),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
