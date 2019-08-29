import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCategory } from './actions'
import { Link, Redirect } from 'react-router-dom';

class Categories extends Component {
  constructor(props){
      super(props);
      this.state  = {
          isOpen:  false,
          sections: [],
          current:  null,
          dataRoute:  '/wp-json/wp/v2/categories?_embed',
          categories: []
      }
  }
  componentDidMount(){
      const { dispatch } = this.props;
      var url = jQuery('meta[name=site_url]').attr("content") + this.state.dataRoute;
      fetch(url)
          .then(res  =>  res.json())
          .then(sections  =>  this.setState((prevState, props) => {
              var categories = sections.map(this.mapSection);
              dispatch(addCategory(categories));
              return { categories: categories  };
          }));
  }



  mapSection(section){
      return {
          name:  section.name,
          id: section.id
      }
  }
  render() {
      const { categories } = this.state;
      if( categories == false )
        return (<div className={"categories"}></div>);

    	return (
        <div className={"categories"}>
              {categories.map((category, j) =>
                <li><Link to={ "?category=" + category.name }>{category.name}</Link></li>
              )}
        </div>
      );
  };
}


const mapStateToProps = (state, categories) => ({
  categories: state.posts.categories
});

export default connect(
  mapStateToProps
)(Categories);
