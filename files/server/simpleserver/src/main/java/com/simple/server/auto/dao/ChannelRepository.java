package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
    public  List<Channel> findByName(String name);
    public  List<Channel> findByNameLike(String name);

    public  Channel findOneByName(String name);

    
       public List<Channel> findByProjectId(Long id);

                   
       public List<Channel> findByIsenable(Long id);

                   
}
