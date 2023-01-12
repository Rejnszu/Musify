export const fetchUser = async (user) => {
  if (user.trim() === "") {
    return;
  }
  const response = await fetch(
    `https://musify-98a44-default-rtdb.firebaseio.com/usersList/${user}.json`
  );
  if (!response.ok) {
    throw new Error("Something went wrong while getting user.");
  }
  const data = await response.json();
  return data;
};
