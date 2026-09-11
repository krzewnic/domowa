


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
        <h1>
          Linki:
        </h1>
        <div class="shad">
          <a href="https://docs.google.com/document/d/1f7Jy1PkdofwuIT7BpLotexNRLnIM9S_7iFgeomVgngA/edit?usp=sharing">Lista tematów do druku</a>
        </div>
        <h1>Zakres 25/26</h1>
        <Page_SimpleShad path={this.state.path1} />
        <h1>Tutorial</h1>
        <Page_SimpleShad path={this.state.path2} />
        <h1>Tabelka</h1>
        <Page_TableOfContentWithBloks path={this.state.path3} />
    </>;
  }
}



const container = document.getElementById('page-body');
const root = ReactDOM.createRoot(container);                
root.render(<BodyTestowe />);
cleanConsole();


