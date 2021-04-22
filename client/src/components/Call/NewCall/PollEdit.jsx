import {Button, DatePicker, Form, Input, Select, Switch} from "antd";
import {useState} from "react";


const PollEdit = (props) => {

    const onFinish = (values) => {
        console.log(values);
    };

    const [file, setFile] = useState()

    const handleChange = () => {
        console.log('confirm form')
        props.onCancel()

    }
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
                onFinish={onFinish}
                //onFinish={confirmForm}
            >
                <Form.Item
                    label="Название"
                name = "name">
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
                <Form.Item label="Данные">
                    <input type="file" accept="text/plain, text/x-csv"
                           onChange={handleChange}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

}
export default PollEdit