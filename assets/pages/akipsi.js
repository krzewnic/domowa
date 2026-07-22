
class BodyAkipsi extends PageStructure {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      path: "./assets/pp_json/akipsi/akipsi-topics.json",
      course: props.course
    };
  }
  getContent() {
    return (<Page_TableOfContentWithBloks path={this.state.path} selected={this.state.topic} course={this.state.course} />);
  }
}

const container = document.getElementById('page-body');
const root = ReactDOM.createRoot(container);
const urlParams = new URLSearchParams(window.location.search);
const topic = urlParams.get('topic');;                
const course = "Algorytmy kombinatoryczne i podstawy sztucznej inteligencji";
root.render(<BodyAkipsi selected={topic} course={course}  />);
cleanConsole();


