class InfoContentSimplePoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            point: props.point
        }
    }
    render() {
        return <li dangerouslySetInnerHTML={{ __html: this.state.point }}></li>
    }
}
class InfoContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: props.language,
            content: props.content
        }
    }
    render() {
        if (this.state.content.type == "ul") {
            let points = this.state.content.points.map((point, index) => {
                return <InfoContentSimplePoint point={point} />
            })
            return <ul class="m-3">{points}</ul>
        }
    }
}

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: props.language,
            info: props.info
        }
    }
    render() {
        if (this.state.language in this.state.info) {
            let label = <div>{this.state.info[this.state.language]}</div>;
            let value = this.state.info.value ? <div class="m-3" dangerouslySetInnerHTML={{ __html: this.state.info.value }}></div> : '';
            let content = this.state.info.content ? <InfoContent language={this.state.language} content={this.state.info.content} /> : '';

            return (<>
                {label}
                {value}
                {content}
            </>
            );
        }
    }
}

class InfoNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: props.language,
            info: props.info
        }
    }

    getTranslatedNews() {
        return <>
            <div class="row mt-4">
                <div class="col-6 ">
                    <h5>{this.state.info.pl.title} </h5>
                    <span class="font-italic font-weight-light text-muted small">{this.state.info.pl.date} </span>
                </div>
                <div class="col-6">
                    <h5>{this.state.info.en.title} </h5>
                    <span class="font-italic font-weight-light text-muted small">{this.state.info.en.date} </span>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-6 ">
                    <div class="mb-4" dangerouslySetInnerHTML={{ __html: this.state.info.pl.content }}></div>
                </div>
                <div class="col-6">

                    <div class="mb-4" dangerouslySetInnerHTML={{ __html: this.state.info.en.content }}></div>
                </div>
            </div ></>
    }

    render() {

        if (this.state.info) {
            if ("en" in this.state.info && "pl" in this.state.info) {
                return this.getTranslatedNews();

            }

            if ("pl" in this.state.info) {
                return <div class="row mt-4">
                    <div class="col-12 ">
                        <h5>{this.state.info.pl.title}</h5>
                        <span class="font-italic font-weight-light text-muted small">{this.state.info.pl.date} </span>
                        <div class="mb-4" dangerouslySetInnerHTML={{ __html: this.state.info.pl.content }}></div>
                    </div>
                </div>
            }
        }
    }
}

class InfosMainPage extends FetchingComponent {
    constructor(props) {
        super(props);
        
        this.setState ({
            path: props.path
        });
    }
    renderAfterFetched() {
        if (this.state.data) {
            let infos = this.state.data.informations ? this.state.data.informations.map((info, index) => {
                return <Info language={this.state.data.language} info={info} />
            }
            ) : '';

            let news = this.state.data.news ? this.state.data.news.map((info, index) => {
                return <InfoNews language={this.state.data.language} info={info} />
            }
            ) : '';

            return (<>
                <div class="shad">
                    <h3 class="mb-5">{this.state.data.header}</h3>
                    {infos}
                    <div class="pb-4"></div>
                    
                    {news}
                </div>
            </>
            );

        }
    }
}



