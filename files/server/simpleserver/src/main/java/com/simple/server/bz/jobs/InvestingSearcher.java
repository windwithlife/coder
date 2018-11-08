package com.simple.server.bz.jobs;

import com.simple.server.auto.entity.Indexfutures;
import com.simple.server.auto.service.IndexfuturesService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class InvestingSearcher {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    IndexfuturesCrawler indexfuturesCrawler;
    @Autowired
    CommodityfuturesCrawler commodityfuturesCrawler;

    @Scheduled(cron = "0 0/1 * * * *")
    public void executeIndexFuturesSearcher() {

        indexfuturesCrawler.start();
        logger.info("Indices Futures Searcher");



    }
    @Scheduled(cron = "3 0/5 * * * *")
    public void executeCommodityFuturesSearcher() {


        commodityfuturesCrawler.start();
        logger.info("Commodity Futures Searcher");



    }
}
