const { Component } = React;
const { createRoot } = ReactDOM;

/**
 * Generuje guzik zamykania X i wykonuje akcję cardClosed po jego kliknięciu.
 * @param cardClosed akcja do wykonania po kliknięciu w element
 */
class CloseButton extends Component {
  render() {
    const { cardClosed } = this.props;
    return <>
      <a className="close-button" onClick={cardClosed}>X</a></>
  }
}
/**
 * Generuje nagłówek Okna i wykonuje akcję po kliknięciu guzika zamykającego
 * @param title
 * @param collapseName
 * @param cardClosed - funkcja wskazuje akcje po kliknięciu guzika zamykania okienka
 */
class Header extends Component {
  render() {
    const { cardClosed } = this.props;
    const { title } = this.props;
    return <div className="card-header">
      <i className="ti-info-alt icon mr-2 mb-4 icon-small"></i>
      {title}
      <CloseButton cardClosed={cardClosed} />
    </div>
  }
}

class ImageContrib extends Component {
  render() {
    let { src, contribution, alt } = this.props.imageInfo;
    return <><img src={'assets/img/exercises/' + src} alt={alt} /><br /><p>{contribution ? <a href={contribution}>źródło</a> : ''}</p></>

  }
}
/**
 * Generuje jeden paragraf na podstawie informacji z jsona
 * Paragraf może zawierać title i contents
 * Paragraf powinie zaiwerać typ
 * @param {"links", "description", "ul", "ol" } type typ paragrafu (pochodzi z jsona)
 */

class Paragraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideContent: props.paragraphInfo.toggle == "hide_content",
      toggle: props.paragraphInfo.toggle == "hide_content" || props.paragraphInfo.toggle == "show_content"
    };
  }
  handleClick = () => {
    if (this.state.toggle) {
      var newHideContent = !this.state.hideContent;
      this.setState({ hideContent: newHideContent});
    }
  }
  render() {
    const { paragraphInfo, nrTitle } = this.props;

    let contents = <>Coś innego niż ol, ul, description, links.</>
  

    if (paragraphInfo.type == "links") {
      contents = <Links contents={paragraphInfo.contents} />
    }
    else if (paragraphInfo.type == "description") {
      contents = <Descriptions contents={paragraphInfo.contents} />
    } else if (paragraphInfo.type == "points_hr") {
      contents = <Descriptions contents={paragraphInfo.contents} ending='hr' />
    }
    else if (paragraphInfo.type == "img") {
      contents = <ImageContrib imageInfo={paragraphInfo} />
    } else if (paragraphInfo.type == "rules") {
      contents = <Rules rulesData={paragraphInfo.contents} />
    } else if (paragraphInfo.type == "faq") {
      contents = <Faq faqData={paragraphInfo.contents} />
    }
    else {
      contents = <Points contents={paragraphInfo.contents} subtype={paragraphInfo.type} />
    }

    let description = paragraphInfo.description ? paragraphInfo.description : paragraphInfo.text;

    return <div id={paragraphInfo.id} className={paragraphInfo.visibility == 'hidden' ? 'd-none' : ''}>
      {!paragraphInfo.title ? <></> : <h3 className="card-title">{paragraphInfo.title} {nrTitle ? nrTitle : ''} </h3>}
      {paragraphInfo.icon ? (<><Icon name={paragraphInfo.icon} /></>) : (<></>)}
      <div className={this.state.toggle? "clickable": ""} onClick={this.handleClick.bind(this)}>
      {!this.state.hideContent && this.state.toggle?<Icon name="ti-minus" /> : ""}
      {this.state.hideContent && this.state.toggle?<Icon name="ti-plus" /> :""}
      <span dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      {!this.state.hideContent? contents:""}
    </div>
  }
}



/**
 * Generuje tytuł oraz listę linków
 * @param {collection} linksData - lista linków 
 * @param {string} title 
 */
class Links extends Component {
  render() {
    const { contents } = this.props;
    const links = contents.map(
      (link, index) =>
        <Link key={index} linkData={link} />

    );

    return <>

      <ul>{links}</ul>
    </>;
  }
}



/**
 * Generuje pewną liczbę paragrafów
 * @param descriptionData
 * @param title
 */
class Descriptions extends Component {
  render() {
    const { contents, ending } = this.props;

    const descriptions = contents.map(
      (description, index) =>
        <DescriptionPoint key={index} description={description} ending={ending} />)

    return <>
      {descriptions}
    </>
  }
}


/** Element description może zawierać 
 * @param icon - ikonę
 * @param text - text linku
 * @param url - link
 * @param description - opis linku
 * 
 * Format (elementy nie są obowiazkowe):
 * {ikona} {Link z opisem text lub text bez linku } { - description}
 * 
 * Element description może być tekstem
 */
class DescriptionPoint extends Component {
  render() {

    const { description, ending } = this.props;
    var hrEnding = (ending !== undefined && ending == 'hr') ? (<><hr /></>) : '';


    if (description.type !== undefined) {
      return <><div className="card-text" ><Paragraph paragraphInfo={description} /> {hrEnding}</div></>;
    }

    const text = description.text ? description.text : description;
    const icon = description.icon ? (<><Icon name={description.icon} /></>) : (<></>);
    let descTitle = <span dangerouslySetInnerHTML={{ __html: text }} />;
    if (description.url) {
      descTitle = <a href={description.url} target='_blank'> {descTitle} </a>;
    }



    const descDesc = description.description ? (<><span> - </span><span dangerouslySetInnerHTML={{ __html: description.description }} /> </>) : (<></>);

    const commentDesc = description.comment ? (<><br /><div className="paragraphComment" dangerouslySetInnerHTML={{ __html: description.comment }} /> </>) : (<></>);

    return <div className="card-text" >
      {icon}
      {descTitle}
      {descDesc}
      {commentDesc}
      {hrEnding}
    </div>

  }
}

class Icon extends Component {
  render() {
    const { name } = this.props;
    return <i className={name + " icon text-primary mr-2 mb-4 icon-small"}></i>
  }
}


/**
 * Generuje jeden link
 * @param linkData - zawiera url oraz label do wyświetlenia
 */
class Link extends Component {
  render() {
    const { linkData } = this.props;
    return <li>
      <a href={linkData.url}>{linkData.label}</a>
    </li>;
  }
}


function createDescriptionPointLi(point, index) {
  return <li key={index} className={point.visibility == 'hidden' ? 'd-none' : ''} ><DescriptionPoint description={point} /></li>;
}

/**
 * Komponent Lista wypunktowana typu ol albo ul
 * @param pointsData 
 * @param {string} title 
 * @param {'ol' | 'ul'} subtype ol, ul
 */
class Points extends Component {
  render() {
    const { contents, subtype } = this.props;

    const points = contents.map(
      (point, index) => createDescriptionPointLi(point, index)
    )

    let pointsList;
    if (subtype == "ol") {
      pointsList = <ol>{points}</ol>;
    }
    else if (subtype == "ul") {
      pointsList = <ul>{points}</ul>;
    }
    else if (subtype == "ol-a") {
      pointsList = <ol type="a">{points}</ol>;
    }
    return <>
      {pointsList}
    </>
  }
}

/**
 * Komponent po zamontowaniu pobiera json z podanej ścieżki
 * Należy zaimplementować funkcję render(), tak aby wyrenderować obiekty,
 * kiedy this.state.data jest już załadowane
 * @param {string path}
 */
class FetchingComponent extends Component {
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


/**
 * Komponent renderuje Okienko z tytułem i paragrafami w środku 
 * na podstawie danych z jsona.
 * @param {string} path - ścieżka z której należy pobrać json z paragrafami
 * @param {boolean} isVisible - czy obiekt w danym momencie ma być widoczny 
 * @param {"bg-lg", "bg-lb"} colorClass - temat kolorystyczny 
 * @param cardClosed - funkcja wykonywana po zamknięciu Okna
*/
class ParagraphsCard extends FetchingComponent {
  constructor(props) {
    super(props);
    this.state = {
      path: props.path
    };
  }
  render() {
    super.render();
    const { isActive, colorClass, cardClosed } = this.props;

    if (isActive && this.state.data) {
      return (
        <>
          <div className={colorClass + " card  mb-3 mt-3 "}>
            <Header title={this.state.data.sectionTitle} cardClosed={cardClosed} />
            <div className="card-body p-4">
              <Paragraphs paragraphsInfo={this.state.data.paragraphs} />
            </div>
          </div>
        </>
      );
    }
  }
}

class ParagraphsShad extends FetchingComponent {
  componentDidUpdate(prevProps, prevState) {
      const params = new URLSearchParams(window.location.search);
      const topic = params.get("topic");
      if (topic) {
        const el = document.getElementById("topic_" + topic);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          console.log("nie znaleziono elementu o id");
        }
      }
    }
  constructor(props) {
    super(props);
    this.state = {
      path: props.path
    };
  }
  render() {
    super.render();
    const { isActive, colorClass, cardClosed, course } = this.props;

    if (isActive && this.state.data) {
      return (
        <>
        <div className="shad">
        <h1>{course}</h1>
        <h3 className="text-center m-4 pb-4">Kierunek AiR, W12, PWR</h3>
          
           <Paragraphs paragraphsInfo={this.state.data.paragraphs} />
            
          
          </div>
        </>
      );
    }
  }
}




class Paragraphs extends Component {
  render() {
    const { paragraphsInfo, nrTitle } = this.props;

    const paragraphs = paragraphsInfo.map(
      (paragraph, index) =>
        <Paragraph paragraphInfo={paragraph} key={index} nrTitle={nrTitle ? index + 1 : undefined} />
    );
    return (<>{paragraphs}</>)
  }
}

class Topic extends Component {
  render() {
    const { onClick, isActive, topicData } = this.props;
    console.log(topicData);
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