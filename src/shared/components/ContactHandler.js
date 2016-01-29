import React from 'react';
import Helmet from 'react-helmet';
import Flux from 'flummox/component';

import FlexItem from './FlexItem';
import Form from './Form';
import FormField from './FormField';
import SiteContainer from './SiteContainer';
import TitleSection from './TitleSection';

import { nestedGet } from '../utils/ImmutableUtils';
import { rhythm } from '../theme';

const ContactHandler = React.createClass({
  statics: {
    routerWillRun({ flux }) {
      const PageActions = flux.getActions('pages');
      return PageActions.getPageBySlug('contact');
    },
  },

  render() {
    return (
      <Flux connectToStores={{
        pages: store => ({
          page: store.getPageBySlug('contact')
        })
      }}>
        <ContactPage />
      </Flux>
    );
  }
});

const ContactPage = React.createClass({
  render() {
    const { page } = this.props;

    let titleTag = nestedGet(page, 'meta', 'yoast_wpseo_title') || nestedGet(page, 'title');
    titleTag += " | Parisleaf, A Florida Branding & Digital Agency";

    return (
      <div>
        <Helmet
          title={titleTag}
          meta={[
            {"name": "description", "content": nestedGet(page, 'meta', 'yoast_wpseo_metadesc')},
            {"name": "keywords", "content": nestedGet(page, 'meta', 'yoast_wpseo_metakeywords')},
            {"property": "og:description", "content": nestedGet(page, 'meta', 'yoast_wpseo_metadesc')},
            {"property": "og:image", "content": nestedGet(page, 'featured_image', 'source') || ""},
            {"property": "og:title", "content": titleTag},
            {"property": "og:type", "content": "article"},
            {"property": "og:url", "content": "https://parisleaf.com/contact"},
            {"property": "article:author", "content": ""},
            {"property": "article:published_time", "content": ""},
            {"property": "article:modified_time", "content": ""},
          ]} />
        <TitleSection title="We&#x2019;re all ears and always happy to lend one." />
        <SiteContainer breakFixedSmall padAll>
          <Form action="/contact" method="post">
            <FormField type="text" name="fullName" label="Your name" required />
            <FormField type="text" name="email" label="Your email" required validations="isEmail" validationError="Please enter a valid email address." />
            <FormField type="text" name="phone" label="Your phone number" required />
            <FormField type="text" name="company" label="Your company name" />
            <FormField type="text" name="howDidYouHearAboutUs" label="How did you hear about us?" />
            <FormField type="textarea" name="message" label="Your message" rows={4} required />
            <FormField type="text" name="captcha" label={['Please enter the phrase ', <span>&lsquo;</span>, 'I like turtles', <span>&rsquo;</span>]} required />
          </Form>
        </SiteContainer>
      </div>
    )
  }
});

export default ContactHandler;
