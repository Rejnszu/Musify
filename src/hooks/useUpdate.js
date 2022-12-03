import React, { useEffect, useMemo } from "react";
import { updateActions } from "../redux/update-slice";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateDataMutation } from "../redux/api/dataApiSlice";
import { useCreateCurrentUserMutation } from "../redux/api/currentUserApiSlice";
const useUpdate = () => {
  const dispatch = useDispatch();
  const [updateData] = useUpdateDataMutation();
  const [createCurrentUser] = useCreateCurrentUserMutation();
  const shouldUpdate = useSelector((state) => state.update.shouldUpdate);
  const users = useSelector((state) => state.authentication.users);
  const currentUser = useMemo(
    () =>
      users.find(
        (user) => user.userName === sessionStorage.getItem("currentUser")
      ),
    [users]
  );

  useEffect(() => {
    if (shouldUpdate) {
      updateData(users);
      if (sessionStorage.getItem("isLogged") === "true") {
        if (currentUser !== undefined) {
          createCurrentUser(currentUser);
        }
      }
    }
    return () => {
      dispatch(updateActions.shouldNotUpdate());
    };
  }, [users]);
};

export default useUpdate;
