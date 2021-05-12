import {Button, Popconfirm, Space, Table} from "antd";
import Modal from "antd/es/modal/Modal";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteTemplate, getAllTemplate} from "../../../features/templates";
import TemplateEdit from "./TemplateEdit";

export const Templates = (props) => {

    const dataTemplate = useSelector(state => state.template.data)

    const dispatch = useDispatch()

    const deleteTemplateClick = (value) => {
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
            title: 'Дествие',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Popconfirm title="Sure to delete?" onConfirm={() => deleteTemplateClick(record.key)}>
                        <Button danger>Delete</Button>
                    </Popconfirm>
                    <a> </a>
                    <Button type={"dashed"} onClick={() => {
                        props.setEditTemplateId(record.key)
                        console.log(11)
                    }}>Редактировать </Button>

                </div>

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
                <TemplateEdit setIsModalVisible={setIsModalVisible}/>
            </Modal>
        </div>
    )
}


