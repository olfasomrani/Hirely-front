import api from "./interceptor";

// login with email && pass
export const login = async (email, password) => {
    try {
        const response = await api.post("/api/v1/users/signin-email", {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// create user session
export const createUserSession = async (email, password) => {
    try {
        const response = await api.post("/api/v1/sessions", {
            email,
            password,
        });

        const data = response.data;

        if (data.data?.action === "SHOULD_VERIFY") {
            throw new Error(
                "Votre compte n’est pas encore vérifié. Veuillez vérifier votre email."
            );
        }

        return data;
    } catch (error) {
        throw error;
    }
};

// register user
export const register = async (formData) => {
    try {
        const response = await api.post("/api/v1/noMembers", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// collect all suggested users
export const getSuggestedUsers = async (idUser, page = 1, limit = 10) => {
    try {
        const response = await api.get(`/api/v1/users/suggestions/${idUser}`, {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// collect all contacts
export const getContactsUsers = async (idUser, page = 1, limit = 10) => {
    try {
        const response = await api.get(`/api/v1/users/contacts/${idUser}/`, {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// verify email
export const verifyEmail = async (email, code) => {
    try {
        const response = await api.post("/api/v1/noMembers/verify", {
            email,
            code,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const resendEmail = async (email) => {
    try {
        const response = await api.post("/api/v1/noMembers/resendEmail", {
            email,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};