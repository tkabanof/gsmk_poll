import {useDispatch} from "react-redux";
import {Button, Form, Input} from "antd";
import s from './TemplateEdit.module.css'
import {createBrandNewTemplate} from "../../features/templates";

const TemplateCreateModalForm = (props) => {

    const dispatch = useDispatch()

    const onFinish = (values) => {
        const newTemplate = {
            description: values.name,
        }
        dispatch(createBrandNewTemplate(newTemplate.description))
        props.setIsModalVisible(false)
    };

    return (
        <div className={s.editForm}>
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
            >
                <Form.Item
                    label="Описание"
                    name="name">
                    <Input />

                </Form.Item>


                <Form.Item>
                    <Button type="primary"
                            htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

}
//export default TemplateCreateModalForm