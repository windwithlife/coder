package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface TablecolumnRepository extends JpaRepository<Tablecolumn, Long> {
    public  List<Tablecolumn> findByName(String name);
    public  List<Tablecolumn> findByNameLike(String name);

    public  Tablecolumn findOneByName(String name);

    
       public List<Tablecolumn> findByTableId(Long id);

                   
       public List<Tablecolumn> findByFieldType(Long id);

                   
       public List<Tablecolumn> findByShowType(Long id);

                   
       public List<Tablecolumn> findByMap(Long id);

                   
}
