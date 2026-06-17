function createRule(article, index, spisTr) {
    spisTr.push(article.title);
    return <div key={index} className="article">
            <h2 id={index+1}>§{index+1}. {article.title}</h2>
            
            <Clauses articleIndex={index} clausesData={article.clauses} />
        </div>;
}

const Rules = ({rulesData}) => {  
    var spisTr = new Array();     
    const articles = rulesData.articles.map((article, index) =>
         createRule(article, index, spisTr)
    )
    //console.log(spisTr);
    var spis = spisTr.map((title, index) => 
        <li key={index}><a className="scroll-link" dangerouslySetInnerHTML={{ __html: title }} href={'#'+ (index + 1 )}></a></li>
    );
    //spis.push(<li key="15484"><a href='#faq'>Często zadawane pytania</a></li>);

    return <div><h1>{rulesData.title}</h1>
        <h3 className="text-center m-4">{rulesData.description}</h3>
        <p>Data ostatniej zmiany: {rulesData.date}</p>
        <h4>Spis treści</h4>
        <ol id="navbar">{spis}</ol>
        {articles}
        </div>;

};

function createClause(articleIndex, clause, index) {
    return <Clause key={index} index = {index} articleIndex ={articleIndex} clause={clause} />;
}

const Clauses = ({ articleIndex, clausesData }) => {
    const clauses = clausesData.map((clause, index) =>
        createClause(articleIndex, clause, index)
        
    );
    return <>{clauses}</>
}

function createPoint(point, id) {
    return <li key={id} dangerouslySetInnerHTML={{ __html: point }}></li>
}

const Clause = ({index, articleIndex, clause }) => {
    
    if(typeof(clause) == "string") {
        var inside = <div className="clauseText" dangerouslySetInnerHTML={{ __html: clause }}></div>;
    } else {
        const points = clause.points.map((point, index) =>
            createPoint(point, index)
        );
        var inside = <div className="clauseText"><span dangerouslySetInnerHTML={{ __html: clause.title }}></span><div><ol className={clause.type} type="a">{points}</ol></div></div>;
    }

    return  <div className="d-flex mb-2">
    <span className="clauseIndex" key={index}>{articleIndex + 1}.{index + 1}. </span>
    {inside}
    </div>;
}

const Faq = ({faqData}) => {
    const questions = faqData.questions.map(
        (question, index) =>
        <li key={index} className={question.cls}><p>{question.question}</p><p dangerouslySetInnerHTML={{__html: question.answer}}></p></li>
    )
    return <><h1 className='m-4' id="faq">Często zadawane pytania</h1><ul>{questions}</ul></>
}