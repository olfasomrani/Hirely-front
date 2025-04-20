"use client";
import { useEffect, useState } from "react";
import { getExpertsByStatus } from "@/services/experts";
import ExpertSection from "../../../components/expert/ExpertSection";
import { useRouter } from "next/navigation";

const Expert = () => {
    const router = useRouter();
    const [experts, setExperts] = useState([]);

    const handleJoinUs = async () => {
        router.push("/member/expert/joinUs");
    };

    const fetchExperts = async () => {
        try {
            const data = await getExpertsByStatus("accepted");
            if (data.experts) {
                const expertsWithPhotos = data.experts.map((expert) => ({
                    ...expert,
                    photo:
                        expert.user.photo && expert.user.photo.trim()
                            ? `${
                                  process.env.NEXT_PUBLIC_API_URL
                              }/api/${expert.user.photo
                                  .replace(/^public\\/, "")
                                  .replace(/\\/g, "/")}`
                            : expert.user.civility === "sir"
                            ? "/icons/gender/profileAvatarMen.jpg"
                            : "/icons/gender/profileAvatarWomen.jpg",
                }));
                setExperts(expertsWithPhotos);
            }
        } catch (error) {
            console.error("Error fetching experts:", error);
        }
    };

    useEffect(() => {
        fetchExperts();
    }, []);

    return <ExpertSection experts={experts} handleJoinUs={handleJoinUs} />;
};

export default Expert;
