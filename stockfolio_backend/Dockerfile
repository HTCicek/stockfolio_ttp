FROM ruby:2.7.1-alpine


WORKDIR /app
COPY . /app

RUN gem install bundler --no-doc \
  && gem cleanup bundler
# set up alpine environment for ruby
# install libraries for nokogiri, as nokogiri takes a long time to install from the gem alone
RUN set -ex \
  && apk --update add --no-cache --virtual build-dependencies \
            build-base libc-dev linux-headers tzdata \
            openssl-dev sqlite sqlite-dev \
  && apk add --no-cache \
  libxml2-dev \
  libxslt-dev \
  && gem install nokogiri \
    -- --use-system-libraries \
    --with-xml2-config=/usr/bin/xml2-config \
    --with-xslt-config=/usr/bin/xslt-config

COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 4000

WORKDIR /app
RUN bundle install
RUN rails db:create RAILS_ENV=production
RUN rails db:migrate RAILS_ENV=production
RUN rails db:seed RAILS_ENV=production
