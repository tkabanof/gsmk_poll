import {DatePicker, Form, Input, Select, Switch} from "antd";

const PollEdit = (props: any) => {

    return (
        <div>
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                layout="horizontal"
                initialValues={{
                    size: 'default',
                }}
                size={'middle'}
            >
                <Form.Item label="Название">
                    <Input/>
                </Form.Item>
                <Form.Item label="Шаблон опроса">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Дата опроса">
                    <DatePicker/>
                </Form.Item>
                <Form.Item label="Показать">
                    <Switch/>
                </Form.Item>
            </Form>
        </div>
    )

}
export default PollEdit