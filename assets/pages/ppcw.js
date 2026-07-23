
class BodyPPCw extends PageStructure {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      path: "./assets/pp_json/ppcw/ppcw-topics.json" 
    };
  }
  getContent() {
    return (<Page_TableOfContentWithBloks path={this.state.path} selected={this.state.topic} />);
  }
}

const container = document.getElementById('page-body');
const root = ReactDOM.createRoot(container);
const urlParams = new URLSearchParams(window.location.search);
const topic = urlParams.get('topic');                 
root.render(<BodyPPCw selected={topic}   />);
cleanConsole();


