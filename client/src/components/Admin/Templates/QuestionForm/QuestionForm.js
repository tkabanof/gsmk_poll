import React from "react";
import {Input, Button, Form, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import FormControl from "./FormControl";
import AnswerForm from "./AnswerForm";
import "antd/dist/antd.css";
import {useDispatch} from "react-redux";
import {updateTemplate} from "../../../../features/templates";
import s from "./QuestionForm.module.css"
const QuestionForm = (props) => {


    const template_id = props.template_id

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        console.log(template_id);
        const template_data = {data, template_id}
        dispatch(updateTemplate(template_data))
        props.setIsModalVisible(false)
    };

    return (
        <Form onFinish={(e) => onSubmit(e)}>
            <div>
                <div>
                    <Input placeholder={'Название шаблона'}/>
                </div>
                <br/>
                <FormControl
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
                                                className={s.labelCol}
                                                name={[field.name, "question_text"]}
                                                fieldKey={[field.fieldKey, "question_text"]}
                                                rules={[
                                                    {required: true, message: "Вопрос не может быть пустым!"}
                                                ]}
                                            >
                                                <Input placeholder="Вопрос"/>
                                            </Form.Item>

                                            {/* This is the Dynamic bed Adder */}

                                            <Form.Item>
                                                <AnswerForm fieldKey={field.name}/>
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
