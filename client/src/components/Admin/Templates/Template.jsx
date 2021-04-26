import {Button, Form, Input, Select, Space, Switch, Table, Tag} from "antd";
import Modal from "antd/es/modal/Modal";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createNewTemplate, getAllTemplate} from "../../../features/templates";


export const Templates = () => {

    const dataTemplate = useSelector(state => state.template.data)

    const dispatch = useDispatch()

    useEffect(() => {
             dispatch(getAllTemplate())
        },
        [])

    const columns = [
        {
            title: 'id',
            dataIndex: 'key',
            key: 'id',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Дата создания',
            key: 'createdAt',
            dataIndex: 'createdAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Удалить</a>
                    <a>Скрыть</a>
                </Space>
            ),
        },
    ];

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

    return (
        <div>
            <Table columns={columns} dataSource={dataTemplate}/>
            <Button onClick={showModal}>Создать новый шаблон</Button>
            <Modal title="Новый опрос" visible={isModalVisible}
                //onOk={handleOk}
                   onCancel={handleCancel}
                   footer={null}>
                <TemplateEdit setIsModalVisible = {setIsModalVisible}/>
            </Modal>
        </div>
    )
}


const TemplateEdit = (props) => {

    const dispatch = useDispatch()

    const onFinish = (values) => {
        const newTemplate = {
            description: values.name,
        }
        dispatch(createNewTemplate(newTemplate.description))
        props.setIsModalVisible(false)
    };

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