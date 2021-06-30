import Modal from "antd/es/modal/Modal";
import {useEffect} from "react";

const PollStatistics = (props) => {
    const pollID = props.idPollDetails

    useEffect(()=>{

    },[])

    return (
        <div>
            <Modal title="Basic Modal"
                   visible={true}
                   //onOk={handleOk}
                   footer={[]}
                   onCancel={()=>props.setIdPollDetails(0)}
                >
                <p>Some contents...</p>

            </Modal>
        </div>
    )
}

export default PollStatistics