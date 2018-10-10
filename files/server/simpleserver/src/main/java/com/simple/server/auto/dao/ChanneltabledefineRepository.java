package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface ChanneltabledefineRepository extends JpaRepository<Channeltabledefine, Long> {
    public  List<Channeltabledefine> findByName(String name);
    public  List<Channeltabledefine> findByNameLike(String name);

    public  Channeltabledefine findOneByName(String name);

    
       public List<Channeltabledefine> findByChannelId(Long id);

                   
       public List<Channeltabledefine> findByChannelName(Long id);

                   
       public List<Channeltabledefine> findByTabledefineId(Long id);

                   
       public List<Channeltabledefine> findByTabledefineName(Long id);

                   
}
