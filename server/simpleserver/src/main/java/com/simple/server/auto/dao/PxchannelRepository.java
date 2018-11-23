package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface PxchannelRepository extends JpaRepository<Pxchannel, Long> {
    public  List<Pxchannel> findByName(String name);
    public  List<Pxchannel> findByNameLike(String name);

    public  Pxchannel findOneByName(String name);

    
       public List<Pxchannel> findByProjectId(Long id);

                   
       public List<Pxchannel> findByIsenable(Long id);

                   
}
