import Categories from './Categories';
import React, { Component } from 'react';
import Tags from './Tags';
import InfinitePosts from './InfinitePosts';

const { Fragment } = wp.element;

class Posts extends Component {
  constructor(){
    super();
  }
  render() {
    const { location } = this.props;
    return (
      <Fragment>
        <div className="main">
          <InfinitePosts location={location} categories={[]}/>
        </div>
        <div className="refine">
          <Categories/>
          <Tags/>
        </div>
      </Fragment>
    );
  }
}

export default Posts;
