import React, { createContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRoleFromToken } from '@/app/utils/helpers';
import { getUserById } from '../../services/users';
import authActions from '../../libs/redux/actions/auth';
import selectors from '../../libs/redux/selectors';

export const Roles = {
    noMember: 'noMember',
    member: 'member',
    adminCMDA: 'adminCMDA',
    adminPlatform: 'adminPlatform',
};

export const AuthContext = createContext({
    user: null,
    role: null,
    isNoMember: false,
    isMember: false,
    isadminCMDA: false,
    isAdminPlatform: false,
});

export function Auth({ children }) {
    const [role, setRole] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector(selectors.auth);

    useEffect(() => {
        async function loadUser() {
            if (user) {
                const cookieRole = getRoleFromToken();
                if (cookieRole !== user.role) {
                    try {
                        const res = await getUserById(user.id);
                        dispatch(authActions.setUserAction(res));
                    } catch (err) {
                        dispatch(authActions.clearAuthAction());
                    }
                }

                setRole(user.role);
            }
        }
        loadUser();
    }, [user, dispatch]);

    const contextValue = {
        user,
        role,
        isNoMember: role === Roles.noMember,
        isMember: role === Roles.member,
        isadminCMDA: role === Roles.adminCMDA,
        isAdminPlatform: role === Roles.adminPlatform,
    };

    if (!user) return <div className="h-screen w-full"></div>;

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
