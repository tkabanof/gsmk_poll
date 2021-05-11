import {Button, Form, Input} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

const TemplateEditQuestion = () => {


    const onFinish = values => {
        console.log('Received values of form:', values);
    };

    return (
        <div>

           {/* <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
                <Form.List
                    name="names"
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length < 1) {
                                    return Promise.reject(new Error('Хотя бы один вопрос нужен'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, {add, remove}, {errors}) => (
                        <>
                            {fields.map((field, index) => (

                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Passengers' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item>
                                        <Input placeholder="passenger name" style={{width: '60%'}}/>
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Пожалуйста ",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="passenger name" style={{width: '60%'}}/>
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{width: '60%'}}
                                    icon={<PlusOutlined/>}
                                >
                                    Add field
                                </Button>

                                <Form.ErrorList errors={errors}/>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>*/}
        </div>
    )
}

export default TemplateEditQuestion