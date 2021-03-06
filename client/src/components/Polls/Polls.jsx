import {Button, Popconfirm, Space, Table, Tag} from "antd";
import Modal from "antd/es/modal/Modal";
import PollEdit from "./PollEdit";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeStatusPoll, deleteOnePoll, getAllPoll} from "../../features/polls";
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";
import PollStatistics from "./PollStatistics/PollStatistics";

export const Polls = () => {

    const dataPoll = useSelector(state => state.poll.data)

    let [idPollDetails, setIdPollDetails] = useState(0)

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
            title: 'Действия',
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
                    <Button onClick={()=> setIdPollDetails(record.key)}>Статистика</Button>
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

    const table = (<Table columns={columns} dataSource={dataPoll}/>)

    return (
        <div>
            {table}
            <Button onClick={showModal}>Создать новый опрос</Button>

            <Modal title="Новый опрос" visible={isModalVisible}
                //onOk={handleOk}
                   onCancel={handleCancel}
                   footer={null}>
                <PollEdit setIsModalVisible={setIsModalVisible}/>
            </Modal>

            {idPollDetails !== 0 && <PollStatistics setIdPollDetails = {setIdPollDetails}
                                                   idPollDetails = {idPollDetails}/>}

        </div>
    )
}