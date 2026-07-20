const container = document.getElementById('page-body');
const root = ReactDOM.createRoot(container);
const urlParams = new URLSearchParams(window.location.search);              
const course = "Informacje";
root.render(<InfosBody />);
cleanConsole();