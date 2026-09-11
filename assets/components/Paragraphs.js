const { Component } = React;
const { createRoot } = ReactDOM;


/**
 * Generuje jeden paragraf na podstawie informacji z jsona
 * Paragraf może zawierać title i contents
 * Paragraf powinie zaiwerać typ
 * @param {"links", "description", "ul", "ol" } type typ paragrafu (pochodzi z jsona)
 */

class Paragraph extends React.Component {
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
      this.setState({ hideContent: newHideContent });
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
      <div className={this.state.toggle ? "clickable" : ""} onClick={this.handleClick.bind(this)}>
        {!this.state.hideContent && this.state.toggle ? <Icon name="ti-minus" /> : ""}
        {this.state.hideContent && this.state.toggle ? <Icon name="ti-plus" /> : ""}
        <span dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      {!this.state.hideContent ? contents : ""}
    </div>
  }
}



/**
 * Generuje tytuł oraz listę linków
 * @param {collection} linksData - lista linków 
 * @param {string} title 
 */
class Links extends React.Component {
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
class Descriptions extends React.Component {
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
class DescriptionPoint extends React.Component {
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



/**
 * Generuje jeden link
 * @param linkData - zawiera url oraz label do wyświetlenia
 */
class Link extends React.Component {
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
class Points extends React.Component {
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
  renderAfterFetched() {
    //super.render();
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
  constructor(props) {
    super(props);
    this.state.path = props.path;
  }
  renderAfterFetched() { 
    let sectionTitle = this.state.data.sectionTitle? <h1>{this.state.data.sectionTitle} </h1> : '';
    let sectionSubtitle =this.state.data.sectionSubtitle? <h3 class="text-center mb-3 mt-3">{this.state.data.sectionSubtitle} </h3> : '';
    if (this.state.data) { 
      return (
        <>
          <div className="shad mb-4">
            {sectionTitle}
            {sectionSubtitle}
            <Paragraphs paragraphsInfo={this.state.data.paragraphs} />
          </div>
        </>
      );
    }
  }
}




class Paragraphs extends React.Component {
  render() {
    const { paragraphsInfo, nrTitle } = this.props;

    const paragraphs = paragraphsInfo.map(
      (paragraph, index) =>
        <Paragraph paragraphInfo={paragraph} key={index} nrTitle={nrTitle ? index + 1 : undefined} />
    );
    return (<>{paragraphs}</>)
  }
}


