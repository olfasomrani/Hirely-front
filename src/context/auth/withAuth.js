"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuth } from "../../libs/redux/selectors";

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const router = useRouter();
    const user = useSelector(selectAuth);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      if (user.token == null && user.user == null) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }, [user, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
