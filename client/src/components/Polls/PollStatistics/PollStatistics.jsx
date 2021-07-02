import Modal from "antd/es/modal/Modal";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStat} from "../../../features/client";

const PollStatistics = (props) => {
    const pollID = props.idPollDetails
    const dispatch = useDispatch()
    const stat = useSelector(state => state.client.stat)

    useEffect(() => {
        dispatch(getStat(pollID))
    }, [])

    return (
        <div>
            <Modal title="Статистика по опросу"
                   visible={true}
                   width={700}
                //onOk={handleOk}
                   footer={[]}
                   onCancel={() => props.setIdPollDetails(0)}
            >
                <table
                    border='1'
                    width={600}
                    cellPadding={3}
                >
                    <tr align={"center"}>
                        <th>Всего</th>
                        <th>Завершено успешно</th>
                        <th>Отмененые звонки</th>
                        <th>Всего завершено</th>
                    </tr>
                    {stat.total.map((i) => {
                        return <tr>
                            <td>{i.TOTAL}</td>
                            <td align={"center"}>{i.DONE}</td>
                            <td align={"center"}>{i.REFUSED}</td>
                            <td align={"center"}>{i.CLOSED}</td>
                        </tr>
                    })}
                </table>
                <br/>
                <table
                    border='1'
                    width={600}
                    cellPadding={3}
                >
                    <tr align={"center"}>
                        <th>ФИО</th>
                        <th>Завершил звонков</th>
                        <th>Отменил звонков</th>
                        <th>Всего совершил звонков</th>
                    </tr>
                    {stat.callByOper.map((i) => {
                        return <tr>
                            <td>{i.fio}</td>
                            <td align={"center"}>{i.DONE}</td>
                            <td align={"center"}>{i.REFUSED}</td>
                            <td align={"center"}>{parseInt(i.REFUSED, 10) + parseInt(i.DONE, 10)}</td>
                        </tr>
                    })}
                </table>
            </Modal>
        </div>
    )
}

export default PollStatistics