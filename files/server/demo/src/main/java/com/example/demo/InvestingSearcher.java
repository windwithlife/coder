package com.example.demo;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class InvestingSearcher {
    //Logger logger = LoggerFactory.getLogger(this.getClass());


    private String url="https://cn.investing.com/commodities/real-time-futures";

    @Scheduled(cron = "0/10 * * * * *")
    public void executeIndexFuturesSearcher() {
        try{
            System.out.println("begin schedule");
            Document doc = Jsoup.connect(url)
                    .data("query", "Java")
                    .userAgent("Mozilla")
                    .cookie("auth", "token")
                    .timeout(3000)
                    .get();

            List<Element> contents = doc.getElementById("cross_rate_1").getElementsByTag("tr");
            contents.forEach(element -> {
                if (element.getElementsByTag("th").size() >0){
                    return;
                }else{
                    String name     = element.getElementsByClass("elp").first().text();
                    String vmonth   = element.getElementsByTag("td").get(2).text();
                    String vlast    = element.getElementsByTag("td").get(3).text();
                    String vlow     = element.getElementsByTag("td").get(4).text();
                    String vhigh    = element.getElementsByTag("td").get(5).text();
                    String vchange  = element.getElementsByTag("td").get(6).text();
                    String vchangep = element.getElementsByTag("td").get(7).text();
                    String vtime    = element.getElementsByTag("td").get(8).text();

                    System.out.println(name + vmonth + vlast + vlow + vhigh + vchange + vchangep + vtime);
                    //System.out.println(name );
                }
            });

        }catch (IOException e){
            e.printStackTrace();
        }


    }
}
