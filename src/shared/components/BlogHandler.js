'use strict';

import React from 'react';
import { State, Link } from 'react-router';
import Flux from 'flummox/component';
import Immutable from 'immutable';

import { filter as filterPosts, getCategoryColor } from '../utils/PostUtils';
import { rhythm, color, fontFamily } from '../theme';

import Header from './Header';
import Button from './Button';
import PageHeader from './PageHeader';
import SiteContainer from './SiteContainer';
import BlogCard from './BlogCard';

let style = {
  postContainer: {
    backgroundColor: color('lightGray'),
    padding: `${rhythm(1)} 0`,
  },
};

let BlogHandler = React.createClass({

  mixins: [State],

  statics: {
    async routerWillRun({ state, flux }) {
      const PostActions = flux.getActions('posts');
      const TermActions = flux.getActions('terms');

      return await Promise.all([
        PostActions.getPosts(state.query),
        TermActions.getTaxonomyTerms('category'),
      ]);
    },
  },

  contextTypes: {
    flux: React.PropTypes.any.isRequired,
  },

  getInitialState() {
    let PostStore = this.context.flux.getStore('posts');
    let RouterStore = this.context.flux.getStore('router');

    return {
      query: RouterStore.getQuery(),
      posts: PostStore.getPosts(RouterStore.getQuery()),
    };
  },

  componentDidMount() {
    let PostStore = this.context.flux.getStore('posts');
    let RouterStore = this.context.flux.getStore('router');

    PostStore.addListener('change', this.updatePosts);
    RouterStore.addListener('change', this.updateQuery);
  },

  componentWillUnmount() {
    let PostStore = this.context.flux.getStore('posts');
    let RouterStore = this.context.flux.getStore('router');

    PostStore.removeListener('change', this.updatePosts);
    RouterStore.removeListener('change', this.updateQuery);
  },

  updatePosts() {
    let PostStore = this.context.flux.getStore('posts');

    this.setState({
      posts: PostStore.getAllPosts(),
    });
  },

  updateQuery() {
    let RouterStore = this.context.flux.getStore('router');
    let { query, pathname } = RouterStore.getState();

    if (pathname !== '/blog') return;

    this.setState({ query });
  },

  render() {
    let posts = filterPosts(this.state.posts, this.state.query);

    let cards = posts
      // Sort by date
      .sort((a, b) => {
        a = new Date(a.get('date_gmt'));
        b = new Date(b.get('date_gmt'));
        return a > b ? -1 : a < b ? 1 : 0;
      })
      .map((post, i) =>
        <div className="Blog-postContainer-item">
          <BlogCard
            post={post}
            key={post.get('ID')}
            expanded={i < 2}
          />
        </div>
      )
      .toJS();

    let postContainerStyle = Object.assign({}, style.postContainer);

    return (
      <div>
        <Flux connectToStores={{
          terms: store => ({
            categories: store.getTaxonomyTerms('category')
          })
        }}>
          <BlogHeader />
        </Flux>
        <div style={postContainerStyle}>
          <SiteContainer hang>
            {cards}
          </SiteContainer>
        </div>
      </div>
    );
  },

});

const BlogHeader = React.createClass({
  render() {
    let { categories } = this.props;

    categories = categories || Immutable.List();

    const filters = categories
      .filter(c => c.get('slug') !== 'uncategorized')
      .map((category, i) => {
      return (
        <BlogCategoryFilter
          category={category}
        />
      )
    }).toArray()

    const filterList = filters.reduce((result, filter, i) => {
      if (i === (filters.length - 2)) {
        result = result.concat([filter, ', and ']);
      } else if (i === (filters.length - 1)) {
        result = result.concat([filter]);
      } else {
        result = result.concat([filter, ', ']);
      }

      return result;
    }, []);

    return (
      <PageHeader
        title="Blog"
      >
        <Header level={2}>Sometimes we talk about {filterList}.</Header>
      </PageHeader>
    );
  }
});

const BlogCategoryFilter = React.createClass({
  render() {
    const { category, style, ...props } = this.props;

    return (
      <BlogFilter
        title={category.get('name')}
        query={{ category: category.get('slug') }}
        color={getCategoryColor(category.get('slug'))}
        style={{
          ...style
        }}
        {...props}
      />
    );
  }
});

const BlogFilter = React.createClass({
  mixins: [State],

  getInitialState() {
    return {
      hover: false,
    };
  },

  getDefaultProps() {
    return {
      query: {},
      title: '',
      color: 'currentColor',
    };
  },

  mouseOver() {
    this.setState({hover: true});
  },

  mouseOut() {
    this.setState({hover: false});
  },

  render() {
    const { title, query, style, color } = this.props;
    const isActive = this.isActive('blog', {}, query);

    return (
      <Button
        component={Link}
        to="blog"
        query={query}
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
        style={{
          fontStyle: 'italic',
          position: 'relative',
          color,
          ...style,
        }}
      >
        {title}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: rhythm(1/4),
          background: color,
          opacity: (this.state.hover || isActive) ? 1 : 0,
        }}/>
      </Button>
    );
  }
});

export { BlogHeader };

export default BlogHandler;
