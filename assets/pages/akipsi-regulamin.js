
class BodyAkipsiRegulamin extends PageStructure {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      path: "./assets/pp_json/akipsi/akipsi-regulamin.json"
    };
  }
  getContent() {
    return (<Page_Regulamin path={this.state.path} />);
  }
}

const container = document.getElementById('page-body');
const root = ReactDOM.createRoot(container);
const urlParams = new URLSearchParams(window.location.search);              
root.render(<BodyAkipsiRegulamin />);
cleanConsole();


