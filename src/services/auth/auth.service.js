import HttpService from "@/config/httpService";
import authApi from "./auth.api";

class AuthService extends HttpService {
    static loginWithEmail(data) {
        return this.http.post(authApi.loginWithEmail, data);
    }

    static loginWithGoogle(data) {
        return this.http.post(authApi.loginWithGoogle, data);
    }

    static registerWithEmail(data) {
        return this.http.post(authApi.registerWithEmail, data, {
            headers: {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        });
    }

    static registerWithGoogle(data) {
        return this.http.post(authApi.registerWithGoogle, data);
    }

    static resendVerifyEmail(email) {
        return this.http.post(authApi.resendVerifyEmail, { email });
    }

    static getNextResendVerifyEmail(email) {
        return this.http.post(authApi.getNextResendVerifyEmail, { email });
    }

    static verifyEmail(data) {
        return this.http.post(authApi.verifyEmail, data);
    }

    static resendResetPassCode(data) {
        return this.http.post(authApi.resendResetPassCode, data);
    }

    static ResetPassword(data) {
        return this.http.post(authApi.ResetPassword, data);
    }

    static isEmailExist(data) {
        return this.http.post(authApi.isEmailExist, data);
    }
    static verifyGoogleToken(data) {
        return this.http.post(authApi.verifyGoogleToken, data);
    }
    static handleGoogleCallback(code) {
        return this.http.get(`${authApi.handleGoogleCallback}?code=${code}`);
    }
    static loginWithLinkedin(data) {
        return this.http.post(authApi.loginWithLinkedin, data);
    }
}

export default AuthService;
