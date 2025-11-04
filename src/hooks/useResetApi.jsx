import { useDispatch } from "react-redux";
import { crudEndPointApi } from "../services/crudEndPointApi";

const useResetApi = () => {
    const dispatch = useDispatch();

    const handleResetApi = async () => {
        dispatch(crudEndPointApi.util.resetApiState());
    }

    return { handleResetApi }
};

export default useResetApi