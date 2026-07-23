class Topic extends React.Component {
  render() {
    const { onClick, isActive, topicData } = this.props;
    //console.log(topicData);
    return (
      <div onClick={onClick} className={`nav-link no-padding ${topicData.hidden ? 'd-none' : ''}`}>
        <a className={isActive ? "active-link" : ""}>{topicData.title}</a>
      </div>
    );
  }
}


/**
 * Generuje menu z pliku json. Każdy element w pliku json zawiera nazwę 
 * pozycji menu, oraz nazwę pliku json do wczytania.
 */
class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
      data: props.data
    }
  }
  setActiveIndex(index) {
    this.setState({ activeIndex: index });
    this.props.setActiveIndex(index);
  }

  render() {
    const topics = this.state.data.topics.map((topic, index) => (
      <Topic
        key={index}
        topicData={topic}
        isActive={this.props.activeIndex == index}
        onClick={() => this.setActiveIndex(index)}
      />
    ));

    return <div className="shad">
      <h1>{this.state.data.sectionTitle}</h1>
      <h3 className="text-center m-4">Kierunek AiR, W12, PWR</h3>
      <h4>Spis treści</h4>
      {topics}
    </div>;

  }
}