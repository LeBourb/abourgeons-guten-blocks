import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostTile extends Component {
  constructor(props){
    super(props);
    this.state = {
        category: '',
        category_id: props.category_id        
    };
  }

  appendCategory(category) {
    //console.log(store.getState());
    if(category.id == this.state.id) {
      this.setState({
        category: this.state.name
      });
    }

  }

  getCategory (category_id) {
   var category = 'no_category';
   const { list_categories } = this.props;
   if( list_categories == false )
     return category;
   list_categories.forEach(function(item){
       if(item.id == category_id)
         category = item.name;
   });
   return category;
 }

	render() {
		const { media_url, media_id, title, date, categories, href } = this.props;
		const className = 'abourgeons_fall18abourgeons_fall18_render_imagefeaturing';
    var d = new Date(date).toLocaleString('fr', { year: 'numeric', month: 'numeric', day: 'numeric' }).replace('/','.').replace('/','.');
		return (
      <div className={'tile-post col-xs-6 col-sm-4 col-lg-4'}>
        <a href= {href}>
    			<div className={ className } tabIndex="-1" >
    				<div className={ 'block-img' } >
    				 <div className="imagecontainer">
    						<section className="slide-data-container smallenablediv">
    							<picture>
    								<img src={ media_url } data-id={ media_id } />
    							</picture>
    						</section>
    					</div>
    				</div>
    			</div>
          <div className="title">{title}</div>
          <div className="date">{d}</div>
          <div className="category">{this.getCategory(categories[0])}</div>
        </a>
      </div>
    );
	};
}

const mapStateToProps = (state, props) => ({
  list_categories: state.posts.categories
});

export default connect(
  mapStateToProps
)(PostTile);
