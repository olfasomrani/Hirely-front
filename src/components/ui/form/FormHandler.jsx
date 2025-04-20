import { useEffect } from "react";
import { useForm } from "react-hook-form";

const FormHandler = ({
    Form,
    initialData,
    serverError = [],
    setServerError,
}) => {
    const formprops = useForm({
        defaultValues: initialData,
        mode: "onChange",
    });

    useEffect(() => {
        if (serverError.length > 0) {
            serverError.forEach((error) => {
                formprops.setError(error.field, { message: error.message });
            });
            setServerError?.([]);
        }
    }, [serverError]);
    useEffect(() => {
        if (initialData) {
            formprops.reset(initialData);
        }
    }, [initialData]);

    return <Form {...formprops} />;
};

export default FormHandler;
