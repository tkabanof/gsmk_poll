import {Form, Button, Space, Input} from "antd";
import {PlusOutlined, MinusCircleOutlined} from "@ant-design/icons";


//@ATT:this was created to make nested dynamic elements! This is hard!
const BedForm = props => {
    return (
        <>
            <Form.List name={[props.fieldKey, "answers"]}>
                {(beds, {add, remove}) => {
                    return (
                        <div>
                            {beds.map((bed, index2) => (
                                <Space
                                    key={bed.key}
                                    style={{display: "flex", marginBottom: 8}}
                                    align="start"
                                >
                                    <Form.Item
                                        // name={"aar"}
                                        {...bed}
                                        name={[bed.name, "answer"]}
                                        fieldKey={[bed.fieldKey, "answer"]}
                                        key={index2}
                                        // noStyle
                                        rules={[
                                            {
                                                required: true,
                                                message: "Ответ необходим"
                                            }
                                        ]}
                                    >
                                        <Input placeholder={'Ответ'}></Input>
                                    </Form.Item>
                                    <MinusCircleOutlined
                                        onClick={() => {
                                            remove(bed.name);
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
                                    <PlusOutlined/> Добавить отевт
                                </Button>
                            </Form.Item>
                        </div>
                    );
                }}
            </Form.List>
        </>
    );
};

export default BedForm;
