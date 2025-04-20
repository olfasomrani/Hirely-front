import { pathPrefixer } from "@/utils/helpers";

const userApi = pathPrefixer(
    {
        updateRole: "/update-role",
        updateProfilePhoto: "/profile-photo",
        updateProfileData: "/profile-data",
    },
    "/users"
);

export default userApi;
