import React, { useState } from "react";
import axios from "axios";
import { Input, Modal, Button, Form, message } from "antd";

const PostMovieComponent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const onFinish = (values) => {
        console.log("Success:", values);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { film_name, imdb_id } = values;
        const body = JSON.stringify({ film_name, imdb_id });
        const postMovie = async () => {
            try {
                const res = await axios.post(`api/moviesworld`, body, config);
                if (res.data.msg.indexOf("success") > -1) {
                    message.success("POST Successful!");
                    console.log(res.data);
                }
            } catch (err) {
                message.error("POST Fail!");
                console.log(err);
            }
        };
        postMovie();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div style={{ marginBottom: 30 }}>
            <Button type="primary" block ghost onClick={showModal}>
                Post a Movie
            </Button>
            <Modal
                title="Post your movie"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    {...layout}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Film Name"
                        name="film_name"
                        rules={[
                            {
                                required: true,
                                message: "Please input film name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="IMDB ID"
                        name="imdb_id"
                        rules={[
                            {
                                required: true,
                                message: "Please input IMDB ID!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
export default PostMovieComponent;
