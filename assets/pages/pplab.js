
class BodyPPLab extends PageStructure {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      path: "./assets/pp_json/pplab/pplab-topics.json",
      showAll: props.showAll
    };
  }
  getContent() {
    return (<Page_TableOfContentWithBloks 
        path={this.state.path} 
        selected={this.state.selected} 
        showAll={this.state.showAll}/>);
  }
}

const container = document.getElementById('page-body');
const root = ReactDOM.createRoot(container);
const urlParams = new URLSearchParams(window.location.search);
const topic = urlParams.get('topic');     
const showAll = urlParams.get('show') == "all" ? true: false;
console.log(showAll);

root.render(<BodyPPLab selected={topic} showAll={showAll}  />);
cleanConsole();


