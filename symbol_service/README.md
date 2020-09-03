# Stockfolio Symbol Service

**BLUF** Launch using `ruby application.rb`

## Description

This is a quick Sinatra JSON API (not to spec, it just returns JSON) built to perform reactive searching and front-end validation for the stock purchasing form in the stockfolio web client.

It connects to ftp.nasdaqtrader.com to pull an updated symbol list on each launch.

## API

### `GET '/tickers/:search'`

Perform a search on all tickers by symbol.

Note: Used to perform a pseudo-fuzzy-search on symbol and name, but the results of common words became unreliable.

## Developers(s)

Turcan Cicek
