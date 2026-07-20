/**
 * Generuje menu z pliku json. Każdy element w pliku json zawiera nazwę 
 * pozycji menu, oraz nazwę pliku json do wczytania.
 */
class Topics extends FetchingComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
      path: props.path,
      course: props.course
    }
  }
  setActiveIndex(index) {
    this.setState({ activeIndex: index });
    this.props.setActiveIndex(index);
  }

  render() {
    super.render();
    if (this.state.data) {

      const topics = this.state.data.topics.map((topic, index) => (
        <Topic
          key={index}
          topicData={topic}
          isActive={this.props.activeIndex == index}
          onClick={() => this.setActiveIndex(index)}
        />
      ));

      return <div className="shad">
        <h1>{this.state.course}</h1>
        <h3 className="text-center m-4">Kierunek AiR, W12, PWR</h3>
        <h4>Spis treści</h4>
        {topics}
      </div>;
    }
  }
}