import { selectAuth } from "@/libs/redux/selectors";
import { isWindowAvailable } from "@/utils/helpers";
import { useSelector } from "react-redux";

const useAuth = () => {
    // const user = useSelector(selectAuth);
    const user = JSON.parse(
        isWindowAvailable() ? localStorage.getItem("user") ?? "{}" : "{}"
    );
    return { user, isLogged: !!user };
};

export default useAuth;
