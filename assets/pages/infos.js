class InfosBody extends PageStructure {
    constructor(props) {
        super(props);
        
        
        this.state = {
            path: "./assets/pp_json/informacje/info.json"
        };
    }

    getContent() {
        return <InfosMainPage path={this.state.path} />
    }

}

const container = document.getElementById('page-body');
const root = ReactDOM.createRoot(container);
const urlParams = new URLSearchParams(window.location.search);              
root.render(<InfosBody />);
cleanConsole();