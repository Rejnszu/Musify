export const updateAllData = (users) => {
  return async () => {
    const updateData = async () => {
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
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    };
    updateData().catch((error) => {
      console.log(error);
    });
  };
};
