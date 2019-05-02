import InfiniteScroll from 'react-infinite-scroll-component';
import PostTile from './PostTile';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPosts } from './actions'

var app_this = null;
class InfinitePosts extends Component {
  constructor(){
      super();
      this.state  = {
          isOpen:  false,
          sections: [],
          current:  null,
          dataRoute:  "http://127.0.0.1:10080/wordpress/wp-json/wp/v2/posts",
          per_page: 10,
          page: 1,
          categories: []
      }
      app_this = this;
  }


  get  scaledSections(){
      var  nbr  = (this.state.sections.length/3)
          .toString()
          .split('.');
      var  sections  = [];
      for(var  i  =  0; i  <  nbr[0]; i++){
          sections[i] = [];
              for(var  j  =  1; j  <=  3; j++ ){
                  sections[i].push(this.state.sections[i*3  +  j  -  1]);
          }
      }
      if(nbr[1]){
          var  missing  =  nbr[1].startsWith('3')
              ?  1
              :  2;
          sections.push([]);
          for(var  k  =  0; k  <  missing; k++){
              sections[sections.length  -  1].push(this.state.sections[nbr[0]*  3 +  k]);
          }
      }
      return  sections;
  }
  componentDidMount(){

      /*fetch(app_this.state.dataRoute)
          .then(res  =>  res.json())
          .then(sections  =>  app_this.setState((prevState, props) => {
              return { sections:  sections.map(app_this.mapSection)};
              var posts = sections.map(app_this.mapSection);
              dispatch(addPosts(posts));
              return { posts: posts  };
          }));*/
  }
  mapSection(section){
      return {
          img:  section.jetpack_featured_media_url,
          src:  section.jetpack_featured_media_url,
          title:  section.title.rendered,
          key:  section.title.rendered,
          description:  section.excerpt.rendered,
          date: section.date_gmt,
          categories: section.categories,
          link: section.link
      }
  }



 getCategoryId (category) {
   var categoryId = null;
   if( this.props.categories == false )
     return categoryId;

   this.props.categories.forEach(function(item){
       if(item.name == category)
         categoryId = item.id;
   });
   return categoryId;
 }

 getTag (tag_id) {
   var tag = 'no_tag';
   if( this.props.tags == false )
     return tag;
   this.props.tags.forEach(function(item){
       if(item.id == tag_id)
         tag = item.name;
   });
   return tag;
 }

  getTagId (tag) {
   var tagId = null;
   if( this.props.tags == false )
     return tagId;
   this.props.tags.forEach(function(item){
       if(item.name == tag)
         tagId = item.id;
   });
   return tagId;
 }

  refresh(){
    return;
  }
  fetch(category, tag){
    var categoryId = this.getCategoryId(category);
    var tagId = this.getTagId(tag);
    const { dispatch } = this.props;
    fetch(app_this.state.dataRoute + '?' + ( categoryId ? 'categories=' + categoryId + '&': '' ) + ( tagId ? 'tags=' + tagId + '&': '' ) + 'per_page=' + this.state.per_page + '&page=' + this.state.page + '&link')
        .then(res  =>  res.json())
        .then(sections  =>  app_this.setState((prevState, props) => {
          var posts = sections.map(this.mapSection);
          dispatch(addPosts(posts));
          return { posts: posts  };
        }));
  }

  deparam(qs) {
      // start bucket; can't cheat by setting it in scope declaration or it overwrites
      var params = {};
      // remove preceding non-querystring, correct spaces, and split
      var qs = qs.substring(qs.indexOf('?')+1).replace('/\+/g',' ').split('&');
      // march and parse
      for (var i = qs.length; i > 0;) {
        var pair = qs[--i].split('=');
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }

      return params;
  };//--  fn  deparam

  render() {
    const { location, posts } = this.props;
    if(this.state.search !== location.search) {
      this.state.search = location.search;
      var extract = this.deparam(location.search);
      this.fetch(extract.category, extract.tag);
      return null;
    }
    var items = [];
    if(posts !== false) {
      var items = posts.map((post, i) =>
      <div  className="columns"  key={i}>
        <PostTile
            media_url={post.img}
            media_id={post.id}
            title={post.title}
            date={post.date}
            href={post.link}
            categories={post.categories}
          />
      </div>
      );
    }
    return (  <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={this.componentDidMount}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={this.refresh}
        pullDownToRefresh
        pullDownToRefreshContent={
          <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
        }>
        {items}
      </InfiniteScroll>);
  }

}

const mapStateToProps = (state, props) => ({
  posts: state.posts.posts,
  tags: state.posts.tags,
  categories: state.posts.categories
});

export default connect(
  mapStateToProps
)(InfinitePosts);
