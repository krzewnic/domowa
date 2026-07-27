
class BodyTestowe extends PageStructure {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      path1: "./assets/pp_json/tabelka-zakres.json", 
      path2: "./assets/pp_json/tabelka-tutorial.json" ,
      path3: "./assets/pp_json/tabelka-topics.json" 
    };
  }
  getContent() {
    return <>
        <Page_SimpleShad path={this.state.path1} />
        <Page_SimpleShad path={this.state.path2} />
        <Page_TableOfContentWithBloks path={this.state.path3} />
    </>;
  }
}



const container = document.getElementById('page-body');
const root = ReactDOM.createRoot(container);                
root.render(<BodyTestowe />);
cleanConsole();


