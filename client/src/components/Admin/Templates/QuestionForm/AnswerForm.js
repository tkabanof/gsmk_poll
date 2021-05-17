import {Form, Button, Space, Input} from "antd";
import {PlusOutlined, MinusCircleOutlined} from "@ant-design/icons";
import s from "./AnswerForm.module.css"

//@ATT:this was created to make nested dynamic elements! This is hard!
const AnswerForm = props => {
    return (
        <>
            <Form.List name={[props.fieldKey, "answers"]}>
                {(answers, {add, remove}) => {
                    return (
                        <div>
                            {answers.map((answer, index2) => (
                                <Space
                                    key={answer.key}
                                    style={{display: "flex", marginBottom: 8}}
                                    align="start"
                                >
                                    <Form.Item
                                        // name={"aar"}
                                        {...answer}
                                        className={s.inputCol}
                                        name={[answer.name, "answer"]}
                                        fieldKey={[answer.fieldKey, "answer"]}
                                        key={index2}
                                        // noStyle
                                        rules={[
                                            {
                                                required: true,
                                                message: "Ответ необходим"
                                            }
                                        ]}
                                    >
                                        <Input placeholder={'Ответ'}/>
                                    </Form.Item>
                                    <MinusCircleOutlined
                                        onClick={() => {
                                            remove(answer.name);
                                        }}
                                    />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                    }}
                                >
                                    <PlusOutlined/> Добавить ответ
                                </Button>
                            </Form.Item>
                        </div>
                    );
                }}
            </Form.List>
        </>
    );
};

export default AnswerForm;
