"use client";
import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";

const ProjectSubmission = ({
    handleProject,
    projects,
    columns,
    onEdit,
    onDelete,
    t,
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <>
            <div className="flex items-center flex-col relative">
                <div className="bg-[url('/images/projet.jpg')] bg-cover bg-center w-full p-4 h-auto z-0">
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <div className="relative z-10 flex flex-col items-start mb-4">
                        <div className="flex flex-row">
                            <div className="pb-[20px]">
                                <h4 className="md:text-3xl text-lg font-semibold mb-2 text-white">
                                    {t("project submission")}
                                </h4>
                                <p className="md:text-lg text-sm mb-4 text-white text-justify">
                                    {t("project_submission_description")}
                                </p>
                            </div>
                        </div>
                        <Button
                            className="mt-4 bg-primary text-white border-none px-8 py-4 md:text-sm text-xs"
                            onClick={handleProject}>
                            {mounted ? t("submit project") : ""}
                            <RightOutlined />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full p-4 ">
                <Table
                    dataSource={projects}
                    columns={columns}
                    rowKey="id"
                    className="mt-16 overflow-x-auto"
                    locale={{
                        emptyText: t("No data"),
                    }}
                />
            </div>
        </>
    );
};

export default ProjectSubmission;
