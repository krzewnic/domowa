
class PpLabProgram extends PageStructure {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      path: "./assets/pp_json/pplab/pplab-program.json"
    };
  }
  getContent() {
    return (<Page_SimpleShad path={this.state.path} selected={this.state.topic}  />);
  }
}

const container = document.getElementById('page-body');
const root = ReactDOM.createRoot(container);
const urlParams = new URLSearchParams(window.location.search);              
root.render(<PpLabProgram />);
cleanConsole();


