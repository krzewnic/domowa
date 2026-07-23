class Rules extends React.Component {
    createRule(article, index, spisTr) {
        spisTr.push(article.title);
        return <div key={index} className="article">
            <h2 id={index + 1}>§{index + 1}. {article.title}</h2>

            <Clauses articleIndex={index} clausesData={article.clauses} />
        </div>;
    }
    render() {
        const { rulesData } = this.props;

        const spisTr = [];

        const articles = rulesData.articles.map((article, index) =>
            this.createRule(article, index, spisTr)
        );

        const spis = spisTr.map((title, index) => (
            <li key={index}>
                <a
                    className="scroll-link"
                    href={"#" + (index + 1)}
                    dangerouslySetInnerHTML={{ __html: title }}
                />
            </li>
        ));

        return (
            <div>
                <h2 className="text-center m-4">{rulesData.title}</h2>

                <h3 className="text-center m-4">
                    {rulesData.description}
                </h3>

                <p>
                    Data ostatniej zmiany: {rulesData.date}
                </p>

                <h4>Spis treści</h4>

                <ol id="navbar">
                    {spis}
                </ol>

                {articles}
            </div>
        );
    }
}

class Clauses extends React.Component {
    createClause(articleIndex, clause, index) {
        return <Clause key={index} index={index} articleIndex={articleIndex} clause={clause} />;
    }
    render() {
        const { articleIndex, clausesData } = this.props;

        const clauses = clausesData.map((clause, index) =>
            this.createClause(articleIndex, clause, index)
        );

        return (
            <>
                {clauses}
            </>
        );
    }
}



class Clause extends React.Component {
    createPoint(point, id) {
        return <li key={id} dangerouslySetInnerHTML={{ __html: point }}></li>
    }
    render() {
        const { index, articleIndex, clause } = this.props;

        let inside;

        if (typeof clause === "string") {
            inside = (
                <div
                    className="clauseText"
                    dangerouslySetInnerHTML={{ __html: clause }}
                />
            );
        } else {
            const points = clause.points.map((point, index) =>
                this.createPoint(point, index)
            );

            inside = (
                <div className="clauseText">
                    <span
                        dangerouslySetInnerHTML={{ __html: clause.title }}
                    />
                    <div>
                        <ol className={clause.type} type="a">
                            {points}
                        </ol>
                    </div>
                </div>
            );
        }

        return (
            <div className="d-flex mb-2">
                <span className="clauseIndex">
                    {articleIndex + 1}.{index + 1}.
                </span>
                {inside}
            </div>
        );
    }
}

class Faq extends React.Component {
    render() {
        const { faqData } = this.props;

        const questions = faqData.questions.map((question, index) => (
            <li key={index} className={question.cls}>
                <p>{question.question}</p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: question.answer
                    }}
                />
            </li>
        ));

        return (
            <ul class="mt-4 mb-4">
                {questions}
            </ul>

        );
    }
}