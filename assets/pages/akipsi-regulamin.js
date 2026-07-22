
class BodyAkipsiRegulamin extends PageStructure {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      path: "./assets/pp_json/akipsi/akipsi-regulamin.json",
      course: props.course
    };
  }
  getContent() {
    return (<Page_Regulamin path={this.state.path} course={this.state.course} />);
  }
}

const container = document.getElementById('page-body');
const root = ReactDOM.createRoot(container);
const urlParams = new URLSearchParams(window.location.search);             
const course = "Algorytmy kombinatoryczne i podstawy sztucznej inteligencji";
root.render(<BodyAkipsiRegulamin course={course}  />);
cleanConsole();


