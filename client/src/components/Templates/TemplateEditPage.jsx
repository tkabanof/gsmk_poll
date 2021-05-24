import QuestionForm from "./QuestionForm/QuestionForm";

const TemplateEditPage = (props) => {
    return (
        <div>
            <div>
                <a>Редактирование шаблона</a>
                <a> id </a>
                <a>{props.editTemplateId}</a>
            </div>
            <div>
                <QuestionForm template_id = {props.editTemplateId}/>
            </div>
        </div>
    )
}

export default TemplateEditPage