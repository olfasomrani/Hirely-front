import React, { useState } from "react";
import { Input, Tooltip } from "antd";

function PasswordInput({
    value,
    onChange,
    className,
    firstName,
    lastName,
    noPlc,
}) {
    const [error, setError] = useState("");

    const validatePassword = (password) => {
        const lengthRequirement = /.{12,}/.test(password);
        const uppercaseRequirement = /[A-Z]/.test(password);
        const lowercaseRequirement = /[a-z]/.test(password);
        const numberRequirement = /[0-9]/.test(password);
        const specialCharRequirement = /[@#$%^&*+!]/.test(password);

        const predictablePatterns = [
            "password",
            "123456",
            "abcdef",
            "qwerty",
            "azerty",
        ];

        if (password.toLowerCase().includes(firstName.toLowerCase())) {
            return "Le mot de passe ne doit pas contenir votre prénom.";
        }
        if (password.toLowerCase().includes(lastName.toLowerCase())) {
            return "Le mot de passe ne doit pas contenir votre nom.";
        }
        if (!lengthRequirement) {
            return "Votre mot de passe doit comporter au moins 12 caractères.";
        }
        if (!uppercaseRequirement) {
            return "Votre mot de passe doit inclure au moins une lettre majuscule.";
        }
        if (!lowercaseRequirement) {
            return "Votre mot de passe doit inclure au moins une lettre minuscule.";
        }
        if (!numberRequirement) {
            return "Votre mot de passe doit inclure au moins un chiffre.";
        }
        if (!specialCharRequirement) {
            return "Votre mot de passe doit inclure un caractère spécial (@, #, $, %, etc.).";
        }

        for (const pattern of predictablePatterns) {
            if (password.toLowerCase().includes(pattern)) {
                return `Le mot de passe ne doit pas inclure des motifs prévisibles comme "${pattern}".`;
            }
        }

        return "";
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        const errorMessage = validatePassword(password);
        setError(errorMessage);
        onChange(password);
    };

    return (
        <div>
            <Tooltip
                title={error || "Votre mot de passe est sécurisé."}
                visible={!!error}
                placement="right"
                color={error ? "red" : "green"}>
                <Input.Password
                    value={value}
                    onChange={handlePasswordChange}
                    className={className}
                    placeholder="Entrez votre mot de passe"
                    status={error ? "error" : ""}
                />
            </Tooltip>
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
}

export default PasswordInput;
