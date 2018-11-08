package com.simple.core.components.crawler;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.scheduling.annotation.Scheduled;


import java.io.IOException;
import java.util.List;
import java.util.Map;

public abstract class SoupCrawler {
    //Logger logger = LoggerFactory.getLogger(this.getClass());


    protected String url="https://cn.investing.com/commodities/real-time-futures";
    public void setUrl(String url){
        this.url = url;
    }
    public void start(){
        try {

            Document doc = Jsoup.connect(this.url)
                    .data("query", "Java")
                    .userAgent("Mozilla")
                    .cookie("auth", "token")
                    .timeout(10000)
                    .get();
            if (doc !=null){
                this.parser(doc);
            }
        }catch (IOException e){
            e.printStackTrace();
        }
    }
    public static Document getDocument(String url){
        try {

            Document doc = Jsoup.connect(url)
                    .data("query", "Java")
                    .userAgent("Mozilla")
                    .cookie("auth", "token")
                    .timeout(10000)
                    .get();
            if (doc !=null){
                return doc;
            }else{
                return null;
            }
        }catch (IOException e){
            e.printStackTrace();
            return null;
        }
    }
    protected abstract  void parser(Document doc);
    //protected abstract void doResult(Map<String,String> result);

}
