export const sendCurrentUser = async (currentUser) => {
  const response = await fetch(
    `https://musify-98a44-default-rtdb.firebaseio.com/activeUser${currentUser.userName}.json`,
    {
      method: "PUT",
      body: JSON.stringify(currentUser),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
// Not used now, but better if it's stays here
// export const getCurrentUser = async (currentUser) => {
//   const response = await fetch(
//     `https://musify-98a44-default-rtdb.firebaseio.com/activeUser${currentUser.userName}.json`
//   );
//   const data = await response.json();
//   return data;
// };

export const deleteCurrentUser = async (currentUser) => {
  await fetch(
    `https://musify-98a44-default-rtdb.firebaseio.com/activeUser${currentUser.userName}.json`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};
