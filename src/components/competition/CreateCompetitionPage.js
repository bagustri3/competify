import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../../assets";
import { checkIfImage } from "../../utils";
import { Form } from "antd";
function CreateCompetitionPage() {
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    return (
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
            createCampaign
            {loading && 'Loading'}
            <Form form={form}></Form>
        </div>
    );
}

export default CreateCompetitionPage;
