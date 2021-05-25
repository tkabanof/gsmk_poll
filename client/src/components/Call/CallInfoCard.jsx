import {Card} from "antd";

const CallInfoCard = (props) => {
    return(
        <Card title={props.name}
              extra={<a href="#">More</a>}
              style={{ width: 700 }}>
            <p>Card content</p>
        </Card>
    )
}

export default CallInfoCard