import { useDeleteCurrentUserMutation } from "../redux/api/currentUserApiSlice";
import { useDeleteUserMutation } from "../redux/api/userDataApiSlice";

const useDeleteUser = () => {
  const [deleteCurrentUser] = useDeleteCurrentUserMutation();
  const [deleteUser, { isLoading, isSuccess }] = useDeleteUserMutation();
  function onDeleteUser(user) {
    deleteUser(user);
    deleteCurrentUser(user);
  }
  return [onDeleteUser, isLoading, isSuccess];
};

export default useDeleteUser;
