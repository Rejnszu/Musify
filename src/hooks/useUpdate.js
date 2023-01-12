import React, { useEffect } from "react";
import { updateActions } from "../redux/update-slice";
import { useSelector, useDispatch } from "react-redux";
import { useCreateCurrentUserMutation } from "../redux/api/currentUserApiSlice";
import { useUpdateUserMutation } from "../redux/api/userDataApiSlice";
const useUpdate = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [updateUser] = useUpdateUserMutation();
  const [createCurrentUser] = useCreateCurrentUserMutation();
  const shouldUpdate = useSelector((state) => state.update.shouldUpdate);

  useEffect(() => {
    if (shouldUpdate) {
      updateUser(user);
      if (sessionStorage.getItem("isLogged") === "true" && user !== undefined) {
        createCurrentUser(user);
      }
    }
    return () => {
      dispatch(updateActions.shouldNotUpdate());
    };
  }, [user]);
};

export default useUpdate;
