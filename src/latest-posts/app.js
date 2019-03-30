import  React, { Component } from  'react';
import ReactDOM from 'react-dom';
const { Fragment } = wp.element;
// in code ES6
import InfiniteScroll from 'react-infinite-scroll-component';

export class FeaturingImageContent extends Component {
	render() {
		const { media_url, media_id, title, date } = this.props;
		const className = 'abourgeons_fall18abourgeons_fall18_render_imagefeaturing';
    var d = new Date(date).toLocaleString('fr', { year: 'numeric', month: 'numeric', day: 'numeric' }).replace('/','.').replace('/','.');
		return (
      <React.Fragment>
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
      </React.Fragment>
    );
	};
}

export class Categories extends Component {
  constructor(props){
      super(props);
      this.state  = {
          isOpen:  false,
          sections: [],
          current:  null,
          dataRoute:  "http://127.0.0.1:10080/wordpress/wp-json/wp/v2/categories?_embed"
      }
  }
  componentDidMount(){
      fetch(this.state.dataRoute)
          .then(res  =>  res.json())
          .then(sections  =>  this.setState((prevState, props) => {
              return { sections:  sections.map(this.mapSection)};
          }));
  }

  mapSection(section){
      return {
          name:  section.name
      }
  }
  render() {
    	return (
        <div className={"categories"}>
              {this.state.sections.map((section, j) =>
              <div  className="category"  key={j}>
                {section.name}
              </div>
              )}
        </div>
      );
  };
}

export class Tags extends Component {
  constructor(props){
      super(props);
      this.state  = {
          isOpen:  false,
          sections: [],
          current:  null,
          dataRoute:  "http://127.0.0.1:10080/wordpress/wp-json/wp/v2/tags?_embed"
      }
  }
  componentDidMount(){
      fetch(this.state.dataRoute)
          .then(res  =>  res.json())
          .then(sections  =>  this.setState((prevState, props) => {
              return { sections:  sections.map(this.mapSection)};
          }));
  }

  mapSection(section){
      return {
          name:  section.name
      }
  }
  render() {
    return (
      <div className={"tags"}>
            {this.state.sections.map((section, j) =>
            <div  className="tag"  key={j}>
              {section.name}
            </div>
            )}
      </div>
    );
  };
}

export class Archives extends Component {
  constructor(props){
      super(props);
      this.state  = {
          isOpen:  false,
          sections: [],
          current:  null  
      }
  }

  render() {
    return (
      <div className={"archives"}>
            {this.state.sections.map((section, j) =>
            <div  className="year"  key={j}>
              {"2019"}
            </div>

            )}
      </div>
    );
  };
}

//import  Header  from  './components/Header';
//import  '../node_modules/react-popupbox/dist/react-popupbox.css'
//import  '../node_modules/bulma/css/bulma.css';
//import  './App.css';
var app_this = null;
class  App  extends  Component {
    constructor(){
        super();
        this.state  = {
            isOpen:  false,
            sections: [],
            current:  null,
            dataRoute:  "http://127.0.0.1:10080/wordpress/wp-json/wp/v2/posts?_embed"
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
        fetch(app_this.state.dataRoute)
            .then(res  =>  res.json())
            .then(sections  =>  app_this.setState((prevState, props) => {
                return { sections:  sections.map(app_this.mapSection)};
            }));
    }
    mapSection(section){
        return {
            img:  section.jetpack_featured_media_url,
            src:  section.jetpack_featured_media_url,
            title:  section.title.rendered,
            key:  section.title.rendered,
            description:  section.excerpt.rendered,
            date: section.date_gmt
        }
    }
    openPopupbox(section){
      //width={section.img.sizes["large-width"]}
        const  content  = (
            <div>
                <img  src={section.src}   alt=""/>
                <p>{section.title} - {section.description}</p>
            </div>)

      //  PopupboxManager.open({ content })
    }

    refresh(section){
      //width={section.img.sizes["large-width"]}
      alert('refresh!');
      //  PopupboxManager.open({ content })
    }
    /*<header  className="App-header">
        <Header></Header>
    </header>

    <img
        className="image"
        alt=""
        src={section.src}
        height={section.img["small-height"]}
        onClick={() => this.openPopupbox(this.state.sections[i*3+j])}/>*/
    render() {
      var items = this.scaledSections.map((level, i) =>
      <div  className="columns"  key={i}>
          {level.map((section, j) =>
          <div  className="column"  key={j}>
            <FeaturingImageContent
                media_url={section.img}
                media_id={section.id}
                title={section.title}
                date={section.date}
              />

          </div>
          )}
      </div>
    );
        return (
        <div  className="App">
        <InfiniteScroll
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
        </InfiniteScroll>
        <Categories/>
        <Tags/>
        <Archives/>
        </div>);
    }
}
export  default  App;

$(function() { /* code here */
  ReactDOM.render(
    <App/>,
    document.getElementById('main')
  );
});
