
const container = document.getElementById('page-body');
const root = ReactDOM.createRoot(container);
const urlParams = new URLSearchParams(window.location.search);
const topic = urlParams.get('topic');;                
const course = "Algorytmy kombinatoryczne i podstawy sztucznej inteligencji";
root.render(<AkipsiBody selected={topic} course={course}  />);
cleanConsole();


