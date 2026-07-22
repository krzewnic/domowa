class LoadingBar extends React.Component {
  render() {
    return (
      <div class="loading-spinner"></div>
    );
  }
}

/**
 * Komponent po zamontowaniu pobiera json z podanej ścieżki
 * Należy zaimplementować funkcję render(), tak aby wyrenderować obiekty,
 * kiedy this.state.data jest już załadowane
 * @param {string path}
 */
class FetchingComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      path: props.path,
      data: null,
      loading: true,
      error: null
    };
  }
  componentDidMount() {
    //this.loadData();
    //setTimeout(() => {
      this.loadData();
    //}, 1000); // 1 sekundy
  }
  loadData() {
    const timestamp = Date.now();
    fetch(this.state.path + "?nc=" + timestamp, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ data: data, loading: false })
        console.log("Loaded data from ", this.state.path);
        this.afterMount();        
      })
      .catch(error => {
        this.setState({ error: error, loading: false })
      });
  }
  afterMount() {

  }
  renderAfterFetched() {

  }

  render() { 
    if (this.state.loading) { 
      return <LoadingBar />;
    }

    if (this.state.error) {
      console.log("Failed to load file ", this.state.path);
      return <div class="shad">
        <h3 class="mb-5">🛸 Aliens probably did this.</h3>
      </div>;
    }

    return this.renderAfterFetched();
  }
}