import {Button, Popconfirm, Space, Table, Tag} from "antd";
import Modal from "antd/es/modal/Modal";
import PollEdit from "./PollEdit";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeStatusPoll, deleteOnePoll, getAllPoll} from "../../../features/polls";
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";

export const Polls = () => {

    const dataPoll = useSelector(state => state.poll.data)

    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(getAllPoll())
        },
        [])

    const columns = [
        {
            title: 'Навзание',
            dataIndex: 'name',
            key: 'name',
            //render: text => <a>{text}</a>,
        },
        {
            title: 'Шаблон',
            dataIndex: 'template',
            key: 'template',
            render: text => <a>{text ? text.description : "ERROR Опрос без ШАБЛОНА!"}</a>
        },
        {
            title: 'Дата создания',
            key: 'dateCreate',
            dataIndex: 'createdAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm title="Уверены что хотите удалить?"
                                onConfirm={() => dispatch(deleteOnePoll(record.key))}
                    >
                        <Button danger>Удалить</Button>
                    </Popconfirm>

                    <Button
                        onClick={() => {
                            dispatch(changeStatusPoll(record.key, record.state))

                        }}
                        icon={record.state === 'close' ? <EyeInvisibleOutlined/> : <EyeOutlined/>}
                    />
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
            <Table columns={columns} dataSource={dataPoll}/>
            <Button onClick={showModal}>Создать новый опрос</Button>

            <Modal title="Новый опрос" visible={isModalVisible}
                //onOk={handleOk}
                   onCancel={handleCancel}
                   footer={null}>
                <PollEdit setIsModalVisible={setIsModalVisible}/>
            </Modal>
        </div>
    )
}