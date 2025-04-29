import { pathPrefixer } from "@/utils/helpers";

const authApi = pathPrefixer(
    {
        refreshToken: "/refresh-token",
        loginWithEmail: "/login-email",
        loginWithGoogle: "/login-google",
        verifyGoogleToken: "/verify-google-token",
        handleGoogleCallback: "/google/callback",
        loginWithLinkedin: "/login-linkedin",
        registerWithEmail: "/register-email",
        registerWithGoogle: "/register-google",
        resendVerifyEmail: "/verify-email-code",
        verifyEmail: "/verify-email",
        resendResetPassCode: "/reset-pass-code",
        ResetPassword: "/reset-password",
        isEmailExist: "/email-exist",
        getNextResendVerifyEmail: "/get-next-send-email",
    },
    "/auth"
);

export default authApi;
