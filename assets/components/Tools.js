function fetchJSONData(path, onCompleted) {
    const timestamp = Date.now();
    fetch(path + "?nc=" + timestamp, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => 
            onCompleted(data))
        .catch((error) => 
               console.error("Unable to fetch data:", error));
}

class PageStructure extends React.Component {  
  getContent() {
    return <h1>...</h1>;
  }
  render() { 
    return <>
      <MainNav />
      <section class="single section-sm pb-0">
        <div class="container">
          <div class="row">
            <div class="col-lg-3">              
                <LeftSideBar path="./assets/pp_json/components_data/leftsidebar.json"/>     
            </div>
            <div class="col-lg-9">
              <div class="bg-white">
                <div class="content">
                  {this.getContent()}
                </div>
              </div>
            </div> </div>
        </div>
      </section>
      <Footer />
    </>
  }

}

class Icon extends React.Component {
  render() {
    const { name } = this.props;
    return <i className={name + " icon text-primary mr-2 mb-4 icon-small"}></i>
  }
}


/**
 * Generuje link zamykania X i wykonuje akcję cardClosed po jego kliknięciu.
 * @param cardClosed akcja do wykonania po kliknięciu w element
 */
class CloseButton extends React.Component {
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
class Header extends React.Component {
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

class ImageContrib extends React.Component {
  render() {
    let { src, contribution, alt } = this.props.imageInfo;
    return <><img src={'assets/img/exercises/' + src} alt={alt} /><br /><p>{contribution ? <a href={contribution}>źródło</a> : ''}</p></>

  }
}
