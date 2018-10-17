package com.simple.server.auto.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.simple.server.auto.entity.*;

public interface PxtablecolumnRepository extends JpaRepository<Pxtablecolumn, Long> {
    public  List<Pxtablecolumn> findByName(String name);
    public  List<Pxtablecolumn> findByNameLike(String name);

    public  Pxtablecolumn findOneByName(String name);

    
       public List<Pxtablecolumn> findByTableId(Long id);

                   
       public List<Pxtablecolumn> findByFieldType(Long id);

                   
       public List<Pxtablecolumn> findByShowType(Long id);

                   
       public List<Pxtablecolumn> findByMap(Long id);

                   
}
