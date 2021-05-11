import {Button, Popconfirm, Space, Table} from "antd";
import Modal from "antd/es/modal/Modal";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteTemplate, getAllTemplate} from "../../../features/templates";
import TemplateEdit from "./TemplateEdit";

export const Templates = () => {

    const dataTemplate = useSelector(state => state.template.data)

    const dispatch = useDispatch()

    const deleteTemplateClick = (value) => {
        console.log(value)
        dispatch(deleteTemplate(value))
    }

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
                <Popconfirm title="Sure to delete?" onConfirm={() => deleteTemplateClick(record.key)}>
                    <a>Delete</a>
                </Popconfirm>
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


