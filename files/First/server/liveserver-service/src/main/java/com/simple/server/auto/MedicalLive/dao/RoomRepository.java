package com.simple.server.auto.MedicalLive.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.MedicalLive.entity.*;

public interface RoomRepository extends JpaRepository<Room, Long> {
    public  List<Room> findByName(String name);
    public  List<Room> findByNameLike(String name);

    public  Room findOneByName(String name);
    public  Room findOneById(Long id);

    
        
}
