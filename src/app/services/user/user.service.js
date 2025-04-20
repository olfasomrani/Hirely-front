import HttpService from "@/config/httpService";
import userApi from "./user.api";

class UserService extends HttpService {
    static updateRoleUser() {
        return this.http.put(userApi.updateRole).then((res) => {
            return res.data;
        });
    }

    static async updateProfilePhoto(file) {
        const formData = new FormData();
        formData.append("photo", file);

        return await this.http.post(userApi.updateProfilePhoto, formData, {
            headers: {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        });
    }

    static async updateProfileData(data) {
        return await this.http.put(userApi.updateProfileData, data);
    }
}
export default UserService;
