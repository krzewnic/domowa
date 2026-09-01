
class PpLabOrganizacja extends PageStructure {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      organizacja_path: "./assets/pp_json/pplab/pplab-organizacja.json"
    };
  }
  getContent() {
    return (<>
      <Page_Regulamin path={this.state.organizacja_path} />
    </>);
  }
}

const container = document.getElementById('page-body');
const root = ReactDOM.createRoot(container);
const urlParams = new URLSearchParams(window.location.search);   
console.log("Działą albo oine.");           
root.render(<PpLabOrganizacja />);
cleanConsole();


