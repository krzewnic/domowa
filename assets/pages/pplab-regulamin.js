
class PpLabRegulamin extends PageStructure {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      path: "./assets/pp_json/pplab/pplab-regulamin.json",
      path_faq: "./assets/pp_json/pplab/pplab-regulamin-faq.json"
    };
  }
  getContent() {
    return (<>
      <Page_Regulamin path={this.state.path} />
      <Page_Faq path={this.state.path_faq} />
    </>);
  }
}

const container = document.getElementById('page-body');
const root = ReactDOM.createRoot(container);
const urlParams = new URLSearchParams(window.location.search);              
root.render(<PpLabRegulamin />);
cleanConsole();


