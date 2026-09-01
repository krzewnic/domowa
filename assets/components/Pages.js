class Page_TableOfContentWithBloks extends FetchingComponent {
  constructor(props) {
    super(props);
    console.log(props);
    this.state.activeIndex = props.selected;
    this.state.path = props.path;   
    this.state.showAll = props.showAll;
  }
  setActiveIndex = (index) => {
    this.setState({ activeIndex: index });
  }
  renderAfterFetched() { 
    if (this.state.data) {
      const cards = this.state.data.topics.map((topic, index) => (
        <ParagraphsCard
          key={index}
          isActive={this.state.activeIndex == index || this.state.showAll}
          onClick={() => this.setActiveIndex(index)}
          path={topic.json}
          colorClass={index % 2 == 0 ? "bg-lg" : "bg-lb"}
          setActiveIndex={this.setActiveIndex}
          cardClosed={() => this.setActiveIndex(null)}
        />
      ));


      return <>
        <Topics data={this.state.data} activeIndex={this.state.activeIndex} setActiveIndex={this.setActiveIndex} />
        {cards}
      </>
    }
  }
}


class Page_Regulamin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: props.path
    };
  }
  render() {
    return <ParagraphsShad
      path={this.state.path}
    />;
  }
}

class Page_SimpleShad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: props.path
    };
  }
  render() {
    return <ParagraphsShad
      path={this.state.path}
    />;
  }
}

class Page_Faq extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      path: props.path
    };
  }
  render() {
    return <>
      <ParagraphsShad
      path={this.state.path}
    />
    </>
  }
}