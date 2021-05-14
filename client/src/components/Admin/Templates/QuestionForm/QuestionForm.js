import React from "react";
import {Input, Button, Form, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import FormControl from "./FormControl";
import BedForm from "./BedForm";
import "antd/dist/antd.css";

const QuestionForm = () => {

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Form onFinish={(e) => onSubmit(e)}>
            <div>
                <div> <a>Шаблон</a>
                    <Input placeholder={'Название шаблона'} />
                </div>
                <br/>
                <FormControl
                    label="How many rooms does your listing have?"
                    //error={errors.guest && <span>This field is required!</span>}
                >
                    {/* This is the Dynamic room Adder */}
                    <Form.List name="questions">
                        {(fields, {add, remove}) => {
                            return (
                                <div>
                                    {fields.map((field) => (
                                        <Space
                                            key={field.key}
                                            style={{display: "flex", marginBottom: 8}}
                                            align="start"
                                        >
                                            <Form.Item
                                                {...field}
                                                name={[field.name, "question-text"]}
                                                fieldKey={[field.fieldKey, "question-text"]}
                                                rules={[
                                                    {required: true, message: "Вопрос не может быть пустым!"}
                                                ]}
                                            >
                                                <Input placeholder="Вопрос"/>
                                            </Form.Item>

                                            {/* This is the Dynamic bed Adder */}

                                            <Form.Item>
                                                <BedForm fieldKey={field.name}/>
                                            </Form.Item>

                                            <MinusCircleOutlined
                                                onClick={() => {
                                                    remove(field.name);
                                                    console.log(field);
                                                }}
                                            />
                                        </Space>
                                    ))}

                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                        block
                                    >
                                        <PlusOutlined/> Добавить вопрос
                                    </Button>
                                </div>
                            );
                        }}
                    </Form.List>
                </FormControl>
            </div>
            <br/>
            <div>
                <div className="inner-wrapper">
                    <Button type="primary" htmlType="submit">
                        Next
                    </Button>
                </div>
            </div>
        </Form>
    );
};

export default QuestionForm;
