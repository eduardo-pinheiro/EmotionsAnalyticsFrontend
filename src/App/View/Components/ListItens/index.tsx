import React from "react";

//Router
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";

export type itemOfListItensComponent = {
  title: string;
  subtitle: string;
  link: string;
}

interface OwnProps {
  data: Array<itemOfListItensComponent>;
}

type Props = RouteComponentProps<{}> & OwnProps;

interface State {
}

class ListItens extends React.Component<Props, State>{

  renderList() {
    return (
      this.props.data.map((value) => (
        <Link key={value.link} to={value.link}>
          <li>
            {typeof value.title === "string" ?
              <h3>{value.title.length < 17 ? value.title : `${value.title.substring(0, 17)}...`}</h3>
              : null}
            {typeof value.subtitle === "string" ?
              <p>{value.subtitle.length < 17 ? value.subtitle : `${value.subtitle.substring(0, 17)}...`}</p>
              : null}
          </li>
        </Link>
      ))
    )
  }

  render() {
    return (
      <nav className="list-itens">
        <ul>
          {this.renderList()}
        </ul>
      </nav>
    )
  }
}

export default withRouter(ListItens);
