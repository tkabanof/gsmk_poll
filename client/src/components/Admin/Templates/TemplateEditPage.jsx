import TemplateEdit from "./TemplateEdit";
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
                {/*<TemplateEdit />*/}
                <QuestionForm/>
            </div>
        </div>
    )
}

export default TemplateEditPage