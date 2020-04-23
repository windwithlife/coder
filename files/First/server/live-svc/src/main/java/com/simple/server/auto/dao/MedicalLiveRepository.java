package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface MedicalLiveRepository extends JpaRepository<MedicalLive, Long> {
    public  List<MedicalLive> findByName(String name);
    public  List<MedicalLive> findByNameLike(String name);

    public  MedicalLive findOneByName(String name);
    public  MedicalLive findOneById(Long id);

    
        
}
