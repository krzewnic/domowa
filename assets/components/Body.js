class MainPage extends FetchingComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.selected,
      path: props.path,
      course: props.course
    };
  }
  setActiveIndex = (index) => {
    this.setState({ activeIndex: index });
  }
  render() {
    super.render();
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


class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      path: "./assets/pp_json/akipsi/akipsi-topics.json",
      course: props.course
    };
  }
  render() {

    return <>
      <MainNav />
      <section class="single section-sm pb-0">
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <div class="sidebar shad">
                <LeftSideBar />
              </div>
            </div>
            <div class="col-lg-9">
              <div class="bg-white">
                <div class="content">
                  <MainPage path={this.state.path} selected={this.state.topic} course={this.state.course} />
                </div>
              </div>
            </div> </div>
        </div>
      </section>
      <Footer />
    </>
  }

}