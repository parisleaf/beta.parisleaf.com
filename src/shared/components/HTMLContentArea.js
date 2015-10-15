'use strict';

import React from 'react';
import SuitCSS from 'react-suitcss';
import chroma from 'chroma-js';

import Slider from './Slider';
import Video from './Video';

import { nestedGet } from '../utils/ImmutableUtils';
import { color } from '../theme';

let HTMLContentArea = React.createClass({

  renderSliders() {
    // query selector
    let slidersObject = document.querySelectorAll('.Slide-this'); // Scoped correctly?

    // scope it within this dom node only // TODO
    let sliders = Array.from(slidersObject);

    // loop thru sliders
    sliders.map(function(slider, count) {
      let images = Array.from(slider.querySelectorAll(':scope > img'));

      images = images.map(function(image) {
        return (
          <img style={{maxWidth: '100%'}} src={image.src} />
        );
      });

      React.render(
        <Slider
          key={count}
          grabCursor={true}
          // ref="projectSlider"
          pagination={'.swiper-pagination'}
          paginationHide={false}
          paginationClickable={true}
          paginationBulletRender={function (index, className) { return '<button class="' + className + '"></button>'; }}
        >
          {images}
        </Slider>
      , slider);

    });
  },

  renderVideos() {
    let videos = Array.from(document.querySelectorAll('div.video-shortcode'));
    // for each
    videos.map(function(video) {
      React.render(
        <Video src={video.dataset.src} content={video.dataset.content} />,
        video
      );
    });
  },

  cleanCaptions() {
    let captions = Array.from(document.querySelectorAll('.wp-caption'));
    // for each
    captions.map(function(caption) {
      caption.removeAttribute("style");
    });
  },

  cleanImages() {
    let images = Array.from(document.querySelectorAll('img.aligncenter'));
    // for each
    images.map(function(image) {
      let imageParent = image.parentNode;
      imageParent.parentNode.insertBefore(image, imageParent.nextSibling);
      imageParent.parentNode.removeChild(imageParent);
    });
  },

  componentDidMount() {
    this.renderSliders();
    this.renderVideos();
    this.cleanCaptions();
    this.cleanImages();
  },

  render() {
    let { html, primaryColor, className, ...props } = this.props;

    let classes = [ 'HTMLContentArea' ];

    if (className) classes.push(className);

    let primaryTextColor = chroma(primaryColor).luminance() < 0.5
      ? color('lightGray')
      : color('text');

    return (
      <span>
        <style>{`
          .HTMLContentArea .CopyContainer--primary {
            background-color: ${primaryColor || 'none'} !important;
            color: ${primaryTextColor} !important
          }
          .HTMLContentArea .CopyContainer--primary p {
            color: ${primaryTextColor} !important
          }
        `}</style>
        <SuitCSS
          element="div"
          componentName="HTMLContentArea"
          modifiers={['fullWidth']}
          className={classes.join(' ')}
          dangerouslySetInnerHTML={{ __html: html }}
          {...props}
        />
      </span>
    );
  }

});

export default HTMLContentArea;
