"use client";
import { useEffect, useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { sendContactMessage } from "../../services/contacts";
import useAuth from "@/hooks/useAuth";

const Contact = () => {
    const [form] = Form.useForm();
    const {
        user: { idUser: userId },
    } = useAuth();

    const handleSubmit = async (values) => {
        try {
            const dataToSend = { ...values, userId };
            await sendContactMessage(dataToSend);
            notification.success({
                message: "Succès",
                description: "Votre message a été envoyé avec succès.",
            });
            form.resetFields();
        } catch (error) {
            notification.error({
                message: "Erreur",
                description:
                    "Une erreur est survenue lors de l'envoi de votre message.",
            });
        }
    };

    return (
        <div
            className="w-full h-full bg-cover p-10"
            style={{ backgroundImage: `url('/images/contact.jpg')` }}>
            <div
                className="max-w-lg  p-6 rounded-md"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <h1 className="text-white text-xl mb-4">Nous Contacter</h1>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    requiredMark="optional">
                    <div className="mb-4">
                        <label className="text-white text-base" htmlFor="nom">
                            Nom
                        </label>
                        <Form.Item
                            name="nom"
                            rules={[
                                {
                                    required: true,
                                    message: "Veuillez entrer votre nom",
                                },
                            ]}
                            noStyle>
                            <Input id="nom" className="mt-1 w-full" />
                        </Form.Item>
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-white text-base"
                            htmlFor="prenom">
                            Prénom
                        </label>
                        <Form.Item
                            name="prenom"
                            rules={[
                                {
                                    required: true,
                                    message: "Veuillez entrer votre prénom",
                                },
                            ]}
                            noStyle>
                            <Input id="prenom" className="mt-1 w-full" />
                        </Form.Item>
                    </div>
                    <div className="mb-4">
                        <label className="text-white text-base" htmlFor="email">
                            Email
                        </label>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    type: "email",
                                    message: "Veuillez entrer un email valide",
                                },
                            ]}
                            noStyle>
                            <Input id="email" className="mt-1 w-full" />
                        </Form.Item>
                    </div>
                    <div className="mb-12">
                        <label
                            className="text-white text-base"
                            htmlFor="message">
                            Message
                        </label>
                        <Form.Item
                            name="message"
                            rules={[
                                {
                                    required: true,
                                    message: "Veuillez entrer votre message",
                                },
                            ]}
                            noStyle>
                            <Input.TextArea
                                id="message"
                                className="mt-1 w-full h-32"
                            />
                        </Form.Item>
                    </div>
                    <div className="text-right">
                        <Button
                            className="bg-primary text-white p-4 w-full sm:w-auto z-10 text-lg border-0"
                            htmlType="submit">
                            Valider
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Contact;
