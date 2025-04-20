import { useEffect, useState } from "react";
import { Table, Button, Input, message } from "antd";
import { getEmailConfig, updateEmailConfig } from "../../services/emailConfig";
const EmailNotifications = () => {
    const [email, setEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const emailData = await getEmailConfig();
                console.log("Données récupérées:", emailData);
                setEmail(emailData);
                setNewEmail(emailData);
            } catch (error) {
                message.error(error.message);
            }
        };
        fetchEmail();
    }, []);

    const handleUpdate = async () => {
        if (!newEmail) {
            message.error("L'email ne peut pas être vide");
            return;
        }
        try {
            await updateEmailConfig(newEmail);
            setEmail(newEmail);
            message.success("Email de notification mis à jour");
            setIsEditing(false);
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-base lg:text-2xl font-semibold text-left mb-4">
                Configuration Email
            </h2>
            <Table
                dataSource={[
                    {
                        key: 1,
                        label: "Admin",
                        value: email,
                    },
                ]}
                columns={[
                    {
                        title: "Email",
                        dataIndex: "value",
                        render: (text) =>
                            isEditing ? (
                                <Input
                                    value={newEmail}
                                    onChange={(e) =>
                                        setNewEmail(e.target.value)
                                    }
                                />
                            ) : (
                                text
                            ),
                    },
                ]}
                pagination={false}
                footer={() =>
                    isEditing ? (
                        <Button onClick={handleUpdate}>Sauvegarder</Button>
                    ) : (
                        <Button onClick={() => setIsEditing(true)}>
                            Modifier
                        </Button>
                    )
                }
            />
        </div>
    );
};

export default EmailNotifications;
