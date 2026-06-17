
const  { Component } = React;

class MainPage extends FetchingComponent {
  constructor(props) {
    super(props); 
    this.state = {
      activeIndex: props.selected,
      path: props.path,
      course:props.course 
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
          path = {topic.json}
          colorClass = { index % 2 == 0 ? "bg-lg" : "bg-lb" }          
          setActiveIndex={this.setActiveIndex}
          cardClosed={()=>this.setActiveIndex(null)}
        />
      ));

      
      return <>
        <Topics course={this.state.course} path={this.state.path} activeIndex={this.state.activeIndex} setActiveIndex={this.setActiveIndex}/>
          {cards}
        </>
    }
  }
}