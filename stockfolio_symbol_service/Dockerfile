FROM ruby:2.7.1-alpine

EXPOSE 4567

WORKDIR /app
COPY . /app

RUN gem install bundler --no-doc \
  && gem cleanup bundler

RUN set -ex \
  && apk --update add --no-cache --virtual .ruby-bundle-deps \
            ruby-dev \
            make \
            g++

WORKDIR /app
RUN bundle install
RUN apk del .ruby-bundle-deps
