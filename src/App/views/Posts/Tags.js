import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { addTags } from './actions'

class Tags extends Component {
  constructor(props){
      super(props);
      this.state  = {
          isOpen:  false,
          sections: [],
          current:  null,
          tags: [],
          dataRoute:  "http://127.0.0.1:10080/wordpress/wp-json/wp/v2/tags?taxonomy=post_tag"
      }
  }
  componentDidMount(){
      const { dispatch } = this.props;
      fetch(this.state.dataRoute)
          .then(res  =>  res.json())
          .then(sections  =>  this.setState((prevState, props) => {
              var tags = sections.map(this.mapSection);
              dispatch(addTags(tags));
              return { tags:  sections.map(this.mapSection)};
          }));
  }

  mapSection(section){
      return {
          name:  section.name,
          id: section.id
      }
  }
  render() {
    const { tags } = this.state;
    if( tags == false )
      return (<div className={"tags"}></div>);
    return (
      <div className={"tags"}>
            {tags.map((tag, j) =>
              <Link to={ "?tag=" + tag.name }>{tag.name}</Link>
            )}
      </div>
    );
  };
}

const mapStateToProps = (state, tags) => ({
  tags: state.posts.tags
});

export default connect(
  mapStateToProps
)(Tags);
