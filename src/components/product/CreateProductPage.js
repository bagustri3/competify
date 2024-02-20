import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../../assets";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Modal, Upload, message } from "antd";
import CustomButton from "../navigation/CustomButton";
import clientAPI from "../../service/ApiService";
import { API_URL } from "../../constants";
import { useStateContext } from "../../context";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function CreateProductPage() {
    const history = useHistory();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { createProduct } = useStateContext();
    const [fileDoc, setFileDoc] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: "none",
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        form.setFieldValue("file", newFileList);
    };
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
        );
    };

    const handleUploadDoc = (file) => {
        const acceptedTypes = ["image/png", "image/jpeg", "image/jpg"];
        const isAccepted = acceptedTypes.includes(file.type);

        if (!isAccepted) {
            message.error("You can only upload PNG, JPEG, or JPG files!");
            return Upload.LIST_IGNORE;
        }

        setFileDoc(file);
        // console.log(fileDoc, file);
        return false;
    };

    const onCreateProduct = async (values) => {
        setLoading(true);
        console.log(values);
        await createProduct({
            ...form,
            target: ethers.utils.parseUnits(values.target, 18),
            image: "",
        });
        // clientAPI
        //     .post(API_URL + `/product/${params.id}`, values)
        //     .then((res) => {

        //         message.success("Product already been created");
        //         form.resetFields()
        //     })
        //     .catch((err) => {
        //         message.error("Error while uploading the Product : " + err);
        //     });
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    return (
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
            {loading && " <Loader />"}
            <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
                    Create The Product
                </h1>
            </div>

            <Form
                name="form"
                className="w-full mt-[65px] flex flex-col gap-[30px]"
                form={form}
            >
                <div className="flex flex-wrap gap-[40px]">
                    <Form.Item
                        name={"title"}
                        rules={[
                            {
                                required: true,
                                message: "Product name is required!",
                            },
                        ]}
                    >
                        <label className="flex-1 w-full flex flex-col">
                            <span className="font-epilogue font-medium text-[14px] leading=[22px] text-[#808191] mb-[10px]">
                                Product Name *
                            </span>
                            <input
                                onChange={(e) => {
                                    form.setFieldValue("title", e.target.value);
                                }}
                                className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:win-w-[300px]"
                            />
                        </label>
                    </Form.Item>
                    <Form.Item
                        name={"target"}
                        rules={[
                            {
                                required: true,
                                message: "target is required!",
                            },
                        ]}
                    >
                        <label className="flex-1 w-full flex flex-col">
                            <span className="font-epilogue font-medium text-[14px] leading=[22px] text-[#808191] mb-[10px]">
                                Target *
                            </span>
                            <input
                                onChange={(e) => {
                                    form.setFieldValue(
                                        "target",
                                        e.target.value
                                    );
                                }}
                                type="number"
                                min={0}
                                className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:win-w-[300px]"
                            />
                        </label>
                    </Form.Item>
                </div>
                <Form.Item
                    name={"description"}
                    rules={[
                        {
                            required: true,
                            message: "description is required!",
                        },
                    ]}
                >
                    <label className="flex-1 w-full flex flex-col">
                        <span className="font-epilogue font-medium text-[14px] leading=[22px] text-[#808191] mb-[10px]">
                            Description *
                        </span>
                        <textarea
                            onChange={(e) => {
                                form.setFieldValue(
                                    "description",
                                    e.target.value
                                );
                            }}
                            rows={10}
                            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:win-w-[300px]"
                        />
                    </label>
                </Form.Item>
                <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
                    <img
                        src={money}
                        alt="money"
                        className="w-[40px] h-[40px] object-contain"
                    />
                    <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
                        You will get the the raised amount after the competition
                        was Ended!
                    </h4>
                </div>
                <div className="flex flex-wrap gap-[40px]">
                    <Form.Item
                        name="file"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        noStyle
                        rules={[
                            {
                                required: true,
                                message: "File is required!",
                            },
                        ]}
                    >
                        <label className="flex-1 w-full flex flex-col">
                            <span className="font-epilogue font-medium text-[14px] leading=[22px] text-[#808191] mb-[10px]">
                                Upload Image *
                            </span>
                            <Upload
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                listType="picture-circle"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                beforeUpload={handleUploadDoc}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal
                                open={previewOpen}
                                title={previewTitle}
                                footer={null}
                                onCancel={handleCancel}
                            >
                                <img
                                    alt="example"
                                    style={{
                                        width: "100%",
                                    }}
                                    src={previewImage}
                                />
                            </Modal>
                        </label>
                    </Form.Item>
                    <br />
                    <div className="flex justify-center items-center mt-[40px]">
                        <CustomButton
                            title={"Submit Product"}
                            styles={"bg-[#1dc071]"}
                            btnType={"submit"}
                            handleClick={() => {
                                form.validateFields()
                                    .then((values) => {
                                        console.log(values);
                                        onCreateProduct(values);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        message.error(
                                            "Error validating values : " +
                                                err.errorFields[0].errors
                                        );
                                    });
                            }}
                        />
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default CreateProductPage;
