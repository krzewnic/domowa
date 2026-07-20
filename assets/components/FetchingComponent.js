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
        this.afterMount();
      })
      .catch(error => {
        this.setState({ error: error, loading: false })
      });
  }
  afterMount() {
    
  }
  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    }

    return (
      <></>
    );
  }
}