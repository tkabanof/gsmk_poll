import {Button, Space, Table, Tag} from "antd";
import Modal from "antd/es/modal/Modal";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";


export const Templates = () => {

    //const dataPoll = useSelector(state => state.poll.data)

    const dispatch = useDispatch()

    useEffect(() => {
            // dispatch(getAllPoll())
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

    const data = [
        {
            key: '1',
            description: 'Шаблон диспансеризация',
            createdAt: '2021-01-01',

        }
    ]
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
            <Table columns={columns} dataSource={data}/>
            <Button onClick={showModal}>Создать новый шаблон</Button>

            <Modal title="Новый опрос" visible={isModalVisible}
                //onOk={handleOk}
                   onCancel={handleCancel}
                   footer={null}>

            </Modal>
        </div>
    )
}