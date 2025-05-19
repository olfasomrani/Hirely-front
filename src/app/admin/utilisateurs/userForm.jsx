"use client";
import React, { useEffect } from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import moment from "moment";

const { Option } = Select;

const UserForm = ({ userId, onSuccess, onSuccessAdd }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3001/users/${userId}`)
                .then((res) => res.json())
                .then((data) => {
                    // conversion de birthDate pour DatePicker
                    if (data.birthDate) {
                        data.birthDate = moment(data.birthDate);
                    }
                    form.setFieldsValue(data);
                });
        }
    }, [userId]);

    const onFinish = async (values) => {
        // conversion birthDate -> Date ISO
        const formattedValues = {
            ...values,
            birthDate: values.birthDate ? values.birthDate.toISOString() : null,
        };

        try {
            if (userId) {
                await fetch(`http://localhost:3001/users/${userId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formattedValues),
                });
                onSuccess && onSuccess({ ...formattedValues, id: userId });
            } else {
                const res = await fetch(`http://localhost:3001/users`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formattedValues),
                });
                const response = await res.json();
                onSuccessAdd && onSuccessAdd(response);
            }
        } catch (err) {
            console.error("Erreur :", err);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="firstName" label="Prénom" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Nom" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                <Input />
            </Form.Item>
            {!userId && (
                <Form.Item name="password" label="Mot de passe" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
            )}
            <Form.Item name="birthDate" label="Date de naissance" rules={[{ required: true }]}>
                <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item name="phone" label="Téléphone" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="role" label="Rôle" rules={[{ required: true }]}>
                <Select>
                    <Option value="Admin">Admin</Option>
                    <Option value="recruteur">recruteur</Option>
                    <Option value="candidat">candidat</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {userId ? "Modifier" : "Ajouter"}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UserForm;
