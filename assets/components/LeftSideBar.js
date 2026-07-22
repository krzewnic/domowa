


class LeftSideBarLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      href: props.href,
      submenu: props.submenu
    };
  }
  render() {

    if (this.state.submenu) {
      //console.log("Submenu", this.state.submenu);

      return <>
        <li class="nav-item">
          <a class="nav-link text-dark" href={this.state.href}>{this.state.title}</a>
          <LeftSideBarUl menu = {this.state.submenu.menu} />
          
        </li>
      </>

    }

    else {
      return <li class="nav-item">
        <a class="nav-link text-dark" href={this.state.href}>{this.state.title}</a>
      </li>
    }
  }
}

class LeftSideBarUl extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      menu: props.menu
    }
  }
  render() {
      //("Renderint with ", this.state);
      const links = this.state.menu.map(
        (link, index) => link.title ? <LeftSideBarLink title={link.title} href={link.href} submenu={link.submenu} key={index} /> : ''
      );
    return <>
        <ul>
          {links}        
        </ul>
      </>
  }
}


class LeftSideBar extends FetchingComponent {
  constructor(props) {
    super(props);  
    this.setState({
      path: props.path
    });
  }
  renderAfterFetched() {
    if (this.state.data) {    
      return <div class="sidebar shad"><LeftSideBarUl menu = {this.state.data.menu} /></div>
    }
  }
}

