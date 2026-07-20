class AkipsiMainPage extends FetchingComponent {
  constructor(props) {
    super(props);
    this.setState({
      activeIndex: props.selected,
      path: props.path,
      course: props.course
    });
  }
  setActiveIndex = (index) => {
    this.setState({ activeIndex: index });
  }
  renderAfterFetched() {    
    if (this.state.data) {
      const cards = this.state.data.topics.map((topic, index) => (
        <ParagraphsCard
          key={index}
          isActive={this.state.activeIndex == index}
          onClick={() => this.setActiveIndex(index)}
          path={topic.json}
          colorClass={index % 2 == 0 ? "bg-lg" : "bg-lb"}
          setActiveIndex={this.setActiveIndex}
          cardClosed={() => this.setActiveIndex(null)}
        />
      ));


      return <>
        <Topics course={this.state.course} path={this.state.path} activeIndex={this.state.activeIndex} setActiveIndex={this.setActiveIndex} />
        {cards}
      </>
    }
  }
}


class AkipsiBody extends PageStructure {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      path: "./assets/pp_json/akipsi/akipsi-topics.json",
      course: props.course
    };
  }
  getContent() {
    return (<AkipsiMainPage path={this.state.path} selected={this.state.topic} course={this.state.course} />);
  }
}