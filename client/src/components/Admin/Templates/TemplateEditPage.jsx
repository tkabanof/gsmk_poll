import TemplateEdit from "./TemplateEdit";

const TemplateEditPage = (props) => {
    return (
        <div>
            <div>
                <a>Редактирование шаблона</a>
                <a> id </a>
                <a>{props.editTemplateId}</a>
            </div>
            <div>
                <TemplateEdit />
            </div>
        </div>
    )
}

export default TemplateEditPage