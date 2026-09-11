class MainNav extends React.Component {
    render() {
        return (
            <header class="shadow-bottom sticky-top bg-white">
                <nav class="navbar navbar-expand-md navbar-light">
                    <div class="container">
                        <a class="navbar-brand px-2" href="../index.html"></a>
                        <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navigation"
                            aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse text-center" id="navigation">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item">
                                    <a class="nav-link text-dark" href=".">Home</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>);
    }
}