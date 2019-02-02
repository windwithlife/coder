
FROM windwithlife/maven-fast:1.0

RUN mkdir -p /tmp/build/
ADD pom.xml /tmp/build/
RUN cd /tmp/build && mvn -q dependency:resolve

ADD src /tmp/build/src
RUN mkdir -p /runDIR/
RUN mkdir -p /release/      
RUN cd /tmp/build && mvn  -DskipTests=true  package 
RUN mv /tmp/build/target/*.jar /runDIR/app.jar
RUN cp /runDIR/*.jar /release/
VOLUME /release/
EXPOSE 8080
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/runDIR/app.jar","--spring.profiles.active=docker"]